import {Firestore} from '@google-cloud/firestore';
import {parseIntoInt} from '@functions/helpers/utils/parseIntoInt';

const firestore = new Firestore();

const notificationsRef = firestore.collection('notifications');

export async function getListNotifications(shopId, {limit, sort, searchKey, page}) {
  let query = notificationsRef;

  // if (searchKey) {
  //   const searchTerm = searchKey.toLowerCase();
  //   query = query
  //     .where('productName', '>=', searchTerm)
  //     .where('productName', '<=', searchTerm + '\uf8ff');
  // }

  query = query.orderBy('timestamp', sort || 'desc');

  const limitInt = parseIntoInt(limit);
  const pageInt = parseIntoInt(page);

  const totalSnapshot = await query.get();
  const totalCount = Math.ceil(totalSnapshot.size / limitInt);

  if (!isNaN(limitInt) && !isNaN(pageInt)) {
    const startIndex = (pageInt - 1) * limitInt;
    query = query.offset(startIndex).limit(limitInt);
  }

  const snapshot = await query.get();

  if (snapshot.empty) {
    return null;
  }

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return {
    data,
    count: totalCount,
    pageInfo: {
      pageNumber: parseIntoInt(page)
    }
  };
}

export async function getListNotificationsByShopDomain(shopDomain) {
  const snapshot = await notificationsRef
    .where('shopDomain', '==', shopDomain)
    .orderBy('timestamp', 'desc')
    .get();

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getNotificationByOrderId(orderId) {
  const snapshot = await notificationsRef.where('orderId', '==', orderId).get();

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function createNotification(notification) {
  return await notificationsRef.add({...notification});
}

export async function createNotifications(notArr) {
  return Promise.all(
    notArr.map(async not => {
      return createNotification(not);
    })
  );
}
