import Shopify from 'shopify-api-node';

export function createShopifyInstance({shopName, accessToken}) {
  return new Shopify({
    shopName,
    accessToken
  });
}

export async function registerWebhook({shopName, accessToken}, {address, topic, format}) {
  const shopify = createShopifyInstance({shopName, accessToken});
  return shopify.webhook.create({address, topic, format});
}
