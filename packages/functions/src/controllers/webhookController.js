import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {getNotificationItems} from '@functions/services/apiService';
import {createNotification} from '@functions/repositories/notificationsRepository';

export async function listenNewOrder(ctx) {
  try {
    const orderData = ctx.req.body;
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const shop = await getShopByShopifyDomain(shopifyDomain);

    const notification = (
      await getNotificationItems({
        shopId: '',
        shopDomain: shopifyDomain,
        accessToken: shop.accessToken,
        orderData
      })
    )[0];

    await createNotification(notification);
  } catch (err) {
    console.log(err);
    return (ctx.body = {
      success: false
    });
  }
}
