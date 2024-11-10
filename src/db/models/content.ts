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
import { db } from '../../config/firebase';
import { slugify } from '../../utils/string';

export const ContentModel = {
  async create(data: {
    title: string;
    type: string;
    category: string;
    content: string;
    description?: string;
    imageUrl?: string;
    accessLevel?: string;
    authorId: string;
  }) {
    const slug = slugify(data.title);
    
    const docRef = await addDoc(collection(db, 'content'), {
      ...data,
      slug,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return docRef.id;
  },

  async createVersion(contentId: string, data: {
    title: string;
    content: string;
    description?: string;
    imageUrl?: string;
    createdBy: string;
  }) {
    const docRef = await addDoc(collection(db, 'content_versions'), {
      contentId,
      ...data,
      createdAt: new Date().toISOString()
    });

    return docRef.id;
  },

  async publish(id: string, publishAt?: Date) {
    const docRef = doc(db, 'content', id);
    await updateDoc(docRef, {
      status: 'published',
      publishAt: publishAt?.toISOString() || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  },

  async getPublished(options: {
    category?: string;
    type?: string;
    accessLevel?: string;
    limit?: number;
    offset?: number;
  } = {}) {
    let q = query(
      collection(db, 'content'),
      where('status', '==', 'published')
    );

    if (options.category) {
      q = query(q, where('category', '==', options.category));
    }

    if (options.type) {
      q = query(q, where('type', '==', options.type));
    }

    if (options.accessLevel) {
      q = query(q, where('accessLevel', '==', options.accessLevel));
    }

    q = query(q, orderBy('publishAt', 'desc'));

    if (options.limit) {
      q = query(q, limit(options.limit));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getBySlug(slug: string) {
    const q = query(collection(db, 'content'), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    const doc = snapshot.docs[0];
    return doc ? { id: doc.id, ...doc.data() } : null;
  }
};