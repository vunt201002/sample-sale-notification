import {
  getListNotifications,
  getListNotificationsByShopDomain
} from '@functions/repositories/notificationsRepository';
import {getCurrentShop} from '@functions/helpers/auth';

export async function getList(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const {limit, sort, page, ...searchKey} = ctx.query;

    const notificationsData = await getListNotifications(shopId, {limit, sort, searchKey, page});

    return (ctx.body = {
      data: notificationsData.data,
      count: notificationsData.count,
      pageInfo: notificationsData.pageInfo,
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
