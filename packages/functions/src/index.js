import * as functions from 'firebase-functions';
import apiHandler from './handlers/api';
import authHandler from './handlers/auth';

export const api = functions.https.onRequest(apiHandler.callback());
export const auth = functions.https.onRequest(authHandler.callback());
