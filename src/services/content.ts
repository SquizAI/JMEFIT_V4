import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  getDocs 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';

export const ContentService = {
  async createContent(data: any, file?: File) {
    let imageUrl = '';
    
    if (file) {
      const storageRef = ref(storage, `content/${file.name}`);
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    }

    const docRef = await addDoc(collection(db, 'content'), {
      ...data,
      imageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return docRef.id;
  },

  async getContent(filters = {}) {
    const contentRef = collection(db, 'content');
    let q = query(contentRef, orderBy('createdAt', 'desc'));

    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }

    if (filters.accessLevel) {
      q = query(q, where('accessLevel', '==', filters.accessLevel));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async updateContent(id: string, data: any, file?: File) {
    let imageUrl = data.imageUrl;
    
    if (file) {
      const storageRef = ref(storage, `content/${file.name}`);
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    }

    const docRef = doc(db, 'content', id);
    await updateDoc(docRef, {
      ...data,
      imageUrl,
      updatedAt: new Date().toISOString()
    });
  },

  async deleteContent(id: string) {
    await deleteDoc(doc(db, 'content', id));
  }
};