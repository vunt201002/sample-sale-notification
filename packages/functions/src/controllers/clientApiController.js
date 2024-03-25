import {getSettingByShopDomain} from '@functions/repositories/settingsRepository';
import {getListNotificationsByShopDomain} from '@functions/repositories/notificationsRepository';

export async function get(ctx) {
  try {
    const {shopDomain} = ctx.query;

    const [setting, notifications] = await Promise.all([
      getSettingByShopDomain(shopDomain),
      getListNotificationsByShopDomain(shopDomain)
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
