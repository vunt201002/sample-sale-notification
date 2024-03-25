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

export async function getWebhooks({shopName, accessToken}, params = []) {
  const shopify = createShopifyInstance({shopName, accessToken});
  return shopify.webhook.list(params);
}

export async function deleteWebhook({shopName, accessToken}, id) {
  const shopify = createShopifyInstance({shopName, accessToken});
  return shopify.webhook.delete(id);
}

export async function deleteWebhooks({shopName, accessToken}, ids) {
  return Promise.all(ids.map(id => deleteWebhook({shopName, accessToken}, id)));
}
