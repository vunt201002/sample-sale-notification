import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();

/**
 * @documentation
 *
 * Only use one repository to connect to one collection, do not
 * try to connect more than one collection from one repository
 */
const collectionRef = firestore.collection('COLLECTION_NAME');
