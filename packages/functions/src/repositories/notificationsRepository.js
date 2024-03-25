import {Firestore} from '@google-cloud/firestore';
import {parseIntoInt} from '@functions/helpers/utils/parseIntoInt';

const firestore = new Firestore();

const notificationsRef = firestore.collection('notifications');

export async function getListNotifications(shopId, {limit, sort, searchKey, page}) {
  let query = notificationsRef;
  console.log(limit, sort, searchKey, page);
  // if (Object.keys(searchKey)[0] && Object.values(searchKey)[0]) {
  //   const searchField = Object.keys(searchKey)[0];
  //   const searchTerm = Object.values(searchKey)[0];
  //   console.log(`searchField: ${searchField}, searchTerm: ${searchTerm}`);
  //   query = query
  //     .where(searchField, '>=', searchTerm)
  //     .where(searchField, '<=', searchTerm + '\uf8ff');
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
    return [];
  }

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return {
    data: data || [],
    count: totalSnapshot.size,
    pageInfo: {
      pageNumber: parseIntoInt(page),
      totalPage: totalCount
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

export async function deleteNotification(id) {
  return await notificationsRef.doc(id).delete();
}

export async function deleteNotifications(ids) {
  return Promise.all(
    ids.map(async id => {
      return deleteNotification(id);
    })
  );
}
