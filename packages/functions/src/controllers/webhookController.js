import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {getNotificationItems} from '@functions/services/apiService';
import {
  createNotification,
  getNotificationByOrderId
} from '@functions/repositories/notificationsRepository';

export async function listenNewOrder(ctx) {
  try {
    const orderData = ctx.req.body;
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const shop = await getShopByShopifyDomain(shopifyDomain);

    const notification = (
      await getNotificationItems({
        shopId: shop.id,
        shopDomain: shopifyDomain,
        accessToken: shop.accessToken,
        orderData: [orderData]
      })
    )[0];

    const existNotification = await getNotificationByOrderId(notification.orderId);

    if (existNotification) return;

    await createNotification(notification);
  } catch (err) {
    console.log(err);
    return (ctx.body = {
      success: false
    });
  }
}
