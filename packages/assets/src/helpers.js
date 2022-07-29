import axios from 'axios';
import createApp from '@shopify/app-bridge';
import {authenticatedFetch, isShopifyEmbedded} from '@shopify/app-bridge-utils';
import {Redirect} from '@shopify/app-bridge/actions';
import * as firebase from 'firebase/app';
import {createBrowserHistory} from 'history';
import 'firebase/analytics';
import 'firebase/storage';
import 'firebase/auth';
import createStore from '@assets/reducers/createStore';

firebase.initializeApp({
  appId: process.env.FIREBASE_APP_ID,
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

export const auth = firebase.auth();
export const storage = firebase.storage();
export const history = createBrowserHistory();
export const store = createStore(history);
export const embedApp = createEmbedApp();
export const client = axios.create({baseURL: '/apiSa', timeout: 60000});

function createEmbedApp() {
  const host = new URL(location).searchParams.get('host');
  if (!host) return;
  return createApp({
    apiKey: process.env.SHOPIFY_API_KEY,
    host
  });
}

export async function api() {
  if (isEmbeddedApp()) {
    const app = embedApp;
    const fetchFunction = authenticatedFetch(app);

    return async (uri, options = {}) => {
      if (options.body) {
        options.body = JSON.stringify(options.body);
        options.headers = options.headers || {};
        options.headers['Content-Type'] = 'application/json';
      }
      const response = await fetchFunction('/api' + uri, options);
      const data = await response.json();
      checkHeadersForReauthorization(response.headers, app);
      return data;
    };
  }

  return async (url, options = {}) => {
    const idToken = await auth.currentUser.getIdToken(false);
    return client
      .request({
        ...options,
        headers: {
          accept: 'application/json',
          ...(options.headers || {}),
          'x-auth-token': idToken
        },
        url,
        method: options.method,
        data: options.body,
        params: options.params
      })
      .then(res => res.data);
  };
}

function checkHeadersForReauthorization(headers, app) {
  if (headers.get('X-Shopify-API-Request-Failure-Reauthorize') === '1') {
    const authUrlHeader =
      headers.get('X-Shopify-API-Request-Failure-Reauthorize-Url') ||
      `/api/auth`;

    const redirect = Redirect.create(app);
    redirect.dispatch(
      Redirect.Action.REMOTE,
      authUrlHeader.startsWith('/')
        ? `https://${window.location.host}${authUrlHeader}`
        : authUrlHeader
    );
  }
}

export function isEmbeddedApp() {
  return (
    isShopifyEmbedded() || window.location.pathname.startsWith(appRoute.embed)
  );
}
