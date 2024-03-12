import App from 'koa';
import 'isomorphic-fetch';
import {contentSecurityPolicy, shopifyAuth} from '@avada/core';
import shopifyConfig from '@functions/config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from 'firebase-admin';
import appConfig from '@functions/config/app';
import {addSettings} from '@functions/repositories/settingsRepository';
import defaultSettings from '@functions/const/defaultSettings';
import {createNotifications} from '@functions/repositories/notificationsRepository';
import {getNotificationItem, getOrderData} from '@functions/services/apiService';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';
import {createWebhook} from '@functions/services/webhookService';

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
    afterLogin: async ctx => {
      try {
        const shopifyDomain = ctx.state.shopify.shop;
        const shop = await getShopByShopifyDomain(shopifyDomain);

        const orderData = await getOrderData({
          shopifyDomain: shopifyDomain,
          accessToken: shop.accessToken,
          limit: 30,
          fields: 'customer,line_items,created_at'
        });

        const listNotifications = await getNotificationItem({
          shopId: shop.id,
          shopDomain: shopifyDomain,
          orderData: orderData,
          accessToken: shop.accessToken
        });

        await Promise.all([
          addSettings({shopDomain: shopifyDomain, shopId: shop.id, addInfo: defaultSettings}),
          createNotifications(listNotifications),
          createWebhook(
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
    afterThemePublish: ctx => {
      // Publish assets when theme is published or changed here
      return (ctx.body = {
        success: true
      });
    }
  }).routes()
);

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;
