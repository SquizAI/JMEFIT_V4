import { 
  collection, 
  addDoc, 
  updateDoc,
  doc,
  query, 
  where, 
  orderBy,
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface ApprovalRequest {
  contentId: string;
  authorId: string;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
  reviewerId?: string;
}

export const ApprovalService = {
  async submitForApproval(contentId: string, authorId: string) {
    return addDoc(collection(db, 'approvals'), {
      contentId,
      authorId,
      status: 'pending',
      createdAt: Timestamp.now()
    });
  },

  async approve(approvalId: string, reviewerId: string) {
    const approvalRef = doc(db, 'approvals', approvalId);
    await updateDoc(approvalRef, {
      status: 'approved',
      reviewerId,
      reviewedAt: Timestamp.now()
    });
  },

  async reject(approvalId: string, reviewerId: string, feedback: string) {
    const approvalRef = doc(db, 'approvals', approvalId);
    await updateDoc(approvalRef, {
      status: 'rejected',
      reviewerId,
      feedback,
      reviewedAt: Timestamp.now()
    });
  },

  async getPendingApprovals() {
    const q = query(
      collection(db, 'approvals'),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'asc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async getApprovalHistory(contentId: string) {
    const q = query(
      collection(db, 'approvals'),
      where('contentId', '==', contentId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};