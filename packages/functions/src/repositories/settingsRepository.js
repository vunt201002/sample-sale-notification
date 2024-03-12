import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();

const settingsRef = firestore.collection('settings');

export async function getSettings(shopId) {
  const snapshot = await settingsRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))[0];
}

export async function updateSettings(shopDomain, shopId, updateInfo) {
  const settingsDoc = await getSettings(shopId);
  delete updateInfo.id;
  return await settingsRef.doc(settingsDoc.id).update(updateInfo);
}

export async function addSettings({shopDomain, shopId, addInfo}) {
  return settingsRef.add({shopDomain, shopId, ...addInfo});
}
