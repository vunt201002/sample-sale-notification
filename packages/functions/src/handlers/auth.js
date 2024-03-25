import App from 'koa';
import 'isomorphic-fetch';
import {contentSecurityPolicy, shopifyAuth} from '@avada/core';
import shopifyConfig from '@functions/config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from 'firebase-admin';
import appConfig from '@functions/config/app';
import {addSetting} from '@functions/repositories/settingsRepository';
import defaultSettings from '@functions/const/defaultSettings';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {deleteWebhooks, getWebhooks, registerWebhook} from '@functions/services/webhookService';
import {syncNotifications} from '@functions/services/notificationService';

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());
app.use(contentSecurityPolicy(true));

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/embed',
    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    },
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    afterInstall: async ctx => {
      try {
        const shopifyDomain = ctx.state.shopify.shop;
        const shop = await getShopByShopifyDomain(shopifyDomain);

        await Promise.all([
          addSetting({shopDomain: shopifyDomain, shopId: shop.id, addInfo: defaultSettings}),
          syncNotifications({
            shopDomain: shopifyDomain,
            accessToken: shop.accessToken,
            shopId: shop.id
          }),
          registerWebhook(
            {
              shopName: shopifyDomain,
              accessToken: shop.accessToken
            },
            {
              address: `https://${appConfig.baseUrl}/webhook/order/new`,
              topic: 'orders/create',
              format: 'json'
            }
          )
        ]);
      } catch (err) {
        console.log(err);
      }
    },
    afterLogin: async ctx => {
      try {
        const shopifyDomain = ctx.state.shopify.shop;
        const shop = await getShopByShopifyDomain(shopifyDomain);

        const webhooks = await getWebhooks({
          shopName: shopifyDomain,
          accessToken: shop.accessToken
        });

        const webhooksToDelete = webhooks
          .filter(webhook => !webhook.address.includes(appConfig.baseUrl))
          .map(webhook => webhook.id);

        if (webhooks.length === webhooksToDelete.length) {
          await registerWebhook(
            {shopName: shopifyDomain, accessToken: shop.accessToken},
            {
              address: `https://${appConfig.baseUrl}/webhook/order/new`,
              topic: 'orders/create',
              format: 'json'
            }
          );
        }

        await deleteWebhooks(
          {shopName: shopifyDomain, accessToken: shop.accessToken},
          webhooksToDelete
        );
      } catch (err) {
        console.log(err);
      }
    },
    afterThemePublish: ctx => {
      // Publish assets when theme is published or changed here
      return (ctx.body = {
        success: true
      });
    }
    // afterLogin: () => {}
  }).routes()
);

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;
