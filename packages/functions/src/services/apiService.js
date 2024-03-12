import {Timestamp} from '@google-cloud/firestore/build/src';
import {createShopifyInstance} from '@functions/services/webhookService';
import onlyUnique from '@functions/helpers/utils/onlyUnique';

export async function getOrderDatas({shopifyDomain, accessToken, limit, fields}) {
  const shopify = createShopifyInstance({shopName: shopifyDomain, accessToken});

  return await shopify.order.list({
    limit: limit,
    fields: fields
  });
}

export async function getNotificationItems({shopId, shopDomain, orderData, accessToken}) {
  const shopify = createShopifyInstance({shopName: shopDomain, accessToken});

  const ids = Array.isArray(orderData)
    ? orderData.map(order => order.line_items[0].product_id)
    : [orderData.line_items[0].product_id];

  const fields = 'id,title,image';

  const products = await shopify.product.list({
    ids: ids.filter(onlyUnique).join(','),
    fields: fields
  });

  return orderData.map(order => ({
    city: order.customer.default_address.city,
    firstName: order.customer.first_name,
    country: order.customer.default_address.country,
    productId: order.line_items[0].product_id,
    productName: order.line_items[0].name,
    timestamp: Timestamp.fromDate(new Date(order.created_at)),
    productImage: products.find(product => product.id === order.line_items[0].product_id).image.src,
    shopId,
    shopDomain
  }));
}
