import * as functions from 'firebase-functions';

export default {
  apiKey: functions.config().shopify.api_key,
  firebaseApiKey: functions.config().shopify.firebase_api_key,
  scopes: ['read_themes', 'write_themes'],
  secret: functions.config().shopify.secret
};
