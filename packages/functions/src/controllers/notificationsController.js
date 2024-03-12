import {getCurrentShop} from '@functions/helpers/auth';
import {
  getListNotifications,
  getListNotificationsByShopDomain
} from '@functions/repositories/notificationsRepository';

export async function getList(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const notifications = await getListNotifications(shopId);
    console.log(shopId);
    return (ctx.body = {
      data: notifications,
      success: true
    });
  } catch (err) {
    ctx.status = 400;
    console.log(err);
    return (ctx.body = {
      data: {},
      success: false
    });
  }
}

export async function getNotificationsByShopDomain(ctx) {
  try {
    const {shopDomain} = ctx.query;
    const notifications = await getListNotificationsByShopDomain(shopDomain);

    return (ctx.body = {
      data: notifications
    });
  } catch (err) {
    ctx.status = 400;
    console.log(err);
    return (ctx.body = {
      data: {},
      success: false
    });
  }
}
