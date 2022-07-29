import axios from 'axios';
import Cookies from 'js-cookie';
import * as firebase from 'firebase/app';
import {createBrowserHistory} from 'history';
import 'firebase/analytics';
import 'firebase/storage';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

export const auth = firebase.auth();

export const storage = firebase.storage();

export const history = createBrowserHistory();

export const client = axios.create({
  baseURL: '/api',
  timeout: 30000
});

/**
 * A method to call API with given settings
 *
 * @param {string} url
 * @param {string} method
 * @param {object} data
 * @param {object} params
 * @param {object} options
 * @return {*}
 */
export async function api(
  url,
  method = 'GET',
  data = {},
  params = {},
  options = {}
) {
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
      method,
      data,
      params
    })
    .then(res => res.data);
}

/**
 * Detect shop from the current environment
 *
 * @return {string}
 */
export function detectShop() {
  return Cookies.get('shopOrigin');
}

export const getRawSupport = () => {
  chatHelpUs('Hi,\nPlease help us to ...');
};

export const shop = detectShop();
