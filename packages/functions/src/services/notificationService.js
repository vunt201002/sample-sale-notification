import {getNotificationItems, getOrderDatas} from '@functions/services/apiService';
import {createNotifications} from '@functions/repositories/notificationsRepository';

export async function syncNotifications({shopDomain, accessToken, shopId}) {
  const orderDatas = await getOrderDatas({
    shopifyDomain: shopDomain,
    accessToken: accessToken,
    limit: 30,
    fields: 'customer,line_items,created_at'
  });

  const listNotifications = await getNotificationItems({
    shopId: shopId,
    shopDomain: shopDomain,
    orderData: orderDatas,
    accessToken: accessToken
  });

  await createNotifications(listNotifications);
}
