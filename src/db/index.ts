// src/db/index.ts
import { 
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  Firestore 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const DatabaseService = {
  // Generic query helpers
  async getOne(collectionName: string, id: string) {
    const docRef = doc(db as Firestore, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  },

  async getAll(collectionName: string, options: {
    where?: [string, any, any][],
    orderBy?: [string, 'asc' | 'desc'],
    limit?: number
  } = {}) {
    let q = collection(db as Firestore, collectionName);

    if (options.where) {
      options.where.forEach(([field, op, value]) => {
        q = query(q, where(field, op, value));
      });
    }

    if (options.orderBy) {
      q = query(q, orderBy(...options.orderBy));
    }

    if (options.limit) {
      q = query(q, limit(options.limit));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async create(collectionName: string, data: any) {
    const docRef = await addDoc(collection(db as Firestore, collectionName), {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  },

  async update(collectionName: string, id: string, data: any) {
    const docRef = doc(db as Firestore, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  },

  async delete(collectionName: string, id: string) {
    const docRef = doc(db as Firestore, collectionName, id);
    await deleteDoc(docRef);
  }
};

export { db };
