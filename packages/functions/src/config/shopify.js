import * as functions from 'firebase-functions';

const {shopify} = functions.config();

export default {
  secret: shopify.secret,
  apiKey: shopify.api_key,
  firebaseApiKey: shopify.firebase_api_key,
  scopes: shopify.scopes?.split(',') || [
    'read_themes',
    'write_themes',
    'read_orders',
    'read_products',
    'read_script_tags',
    'write_script_tags'
  ]
};
