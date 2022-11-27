import { getDoc, doc, getFirestore, collection, DocumentData, DocumentReference, setDoc } from 'firebase/firestore';
import firebaseApp from '.';
const fireStore = getFirestore(firebaseApp);

export const storeGetCollection = (collectionName: string) => collection(fireStore, collectionName);

export const storeGetDocument = (collectionName: string, documentName: string) => doc(fireStore, collectionName, documentName);

export const storeRead = (document: DocumentReference<DocumentData>) => getDoc(document);

export const storeWrite = (document: DocumentReference<DocumentData>, data: any) => setDoc(document, data);
