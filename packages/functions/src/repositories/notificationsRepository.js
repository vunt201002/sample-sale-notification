import {Firestore} from '@google-cloud/firestore';
import timestampToRelativeTime from '@functions/helpers/utils/timestampToRelativeTime';

const firestore = new Firestore();

const notificationsRef = firestore.collection('notifications');

export async function getListNotifications(shopId) {
  const snapshot = await notificationsRef.get();

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs.map(doc => ({
    notificationId: doc.id,
    id: doc.data().productId,
    ...doc.data()
  }));
}

export async function getListNotificationsByShopDomain(shopDomain) {
  const snapshot = await notificationsRef.where('shopDomain', '==', shopDomain).get();

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function createNotification(notification) {
  const relativeTime = timestampToRelativeTime(notification.timestamp);
  return await notificationsRef.add({time: relativeTime, ...notification});
}

export async function createNotifications(notArr) {
  return Promise.all(
    notArr.map(async not => {
      return createNotification(not);
    })
  );
}
