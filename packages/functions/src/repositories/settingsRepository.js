import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();

const settingsRef = firestore.collection('settings');

export async function getSetting(shopId) {
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

export async function updateSetting(shopDomain, shopId, updateInfo) {
  const settingsDoc = await getSetting(shopId);
  delete updateInfo.id;
  await settingsRef.doc(settingsDoc.id).update({...updateInfo});

  return await getSetting(shopId);
}

export async function addSetting({shopDomain, shopId, addInfo}) {
  return settingsRef.add({shopDomain, shopId, ...addInfo});
}
