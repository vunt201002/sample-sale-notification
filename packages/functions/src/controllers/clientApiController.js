import {getCurrentShop} from '@functions/helpers/auth';
import {getSettings} from '@functions/repositories/settingsRepository';
import {
  getListNotifications,
  getListNotificationsByShopDomain
} from '@functions/repositories/notificationsRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';

export async function get(ctx) {
  try {
    const {shopDomain} = ctx.query;
    const shop = await getShopByShopifyDomain(shopDomain);
    const shopId = shop.id;
    const [setting, notifications] = await Promise.all([
      await getSettings(shopId),
      await getListNotificationsByShopDomain(shopDomain)
    ]);

    return (ctx.body = {
      data: {
        setting,
        notifications
      }
    });
  } catch (err) {
    ctx.status = 404;
    console.log(err);
    return (ctx.body = {
      data: {},
      success: false
    });
  }
}
