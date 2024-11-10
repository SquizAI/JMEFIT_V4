import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface ProgressEntry {
  userId: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  notes?: string;
}

export const ProgressService = {
  async addEntry(data: ProgressEntry) {
    return addDoc(collection(db, 'progress'), {
      ...data,
      date: Timestamp.fromDate(data.date),
      createdAt: Timestamp.now()
    });
  },

  async getUserProgress(userId: string, startDate?: Date, endDate?: Date) {
    const progressRef = collection(db, 'progress');
    let q = query(
      progressRef,
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );

    if (startDate && endDate) {
      q = query(
        q,
        where('date', '>=', Timestamp.fromDate(startDate)),
        where('date', '<=', Timestamp.fromDate(endDate))
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate()
    }));
  },

  async getLatestEntry(userId: string) {
    const q = query(
      collection(db, 'progress'),
      where('userId', '==', userId),
      orderBy('date', 'desc'),
      limit(1)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate()
    };
  }
};