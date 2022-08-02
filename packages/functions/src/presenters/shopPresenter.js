import {Timestamp} from '@google-cloud/firestore';

/**
 * @param {*} shop
 * @returns {Shop}
 */
export default function presentShop(shop) {
  Object.keys(shop).forEach(field => {
    if (shop[field] instanceof Timestamp) {
      shop[field] = shop[field].toDate();
    }
  });

  return shop;
}
