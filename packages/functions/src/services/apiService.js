import {api} from '@functions/helpers/api';
import {Timestamp} from '@google-cloud/firestore/build/src';

const apiVersion = 'admin/api/2024-01';
const headerApi = accessToken => ({
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': accessToken
});

export async function getOrderDatas({shopifyDomain, accessToken, limit, fields}) {
  const resOrder = await api(
    `https://${shopifyDomain}/${apiVersion}/orders.json?limit=${limit}&fields=${fields}`,
    'GET',
    {
      headers: headerApi(accessToken)
    }
  );

  return resOrder.orders;
}

export async function getNotificationItems({shopId, shopDomain, orderData, accessToken}) {
  const ids = Array.isArray(orderData)
    ? orderData.map(order => order.line_items[0].product_id)
    : [orderData.line_items[0].product_id];

  const fields = 'id,title,image';

  const resProducts = await api(
    `https://${shopDomain}/${apiVersion}/products.json?ids=${ids.join(',')}&fields=${fields}`,
    'GET',
    {
      headers: headerApi(accessToken)
    }
  );

  return orderData.map(order => ({
    city: order.customer.default_address.city,
    firstName: order.customer.first_name,
    country: order.customer.default_address.country,
    productId: order.line_items[0].product_id,
    productName: order.line_items[0].name,
    timestamp: Timestamp.fromDate(new Date(order.created_at)),
    productImage: resProducts.products.find(
      product => product.id === order.line_items[0].product_id
    ).image.src,
    shopId,
    shopDomain
  }));
}
