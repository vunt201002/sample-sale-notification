import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('shops');

/**
 * @param id
 * @returns {Promise<*>}
 */
export async function getShopById(id) {
  const doc = await collection.doc(id).get();

  return {id: doc.id, ...doc.data()};
}
