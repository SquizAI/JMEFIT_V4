import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  Timestamp,
  increment,
  runTransaction
} from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';
import { db, analytics } from '../config/firebase';

export const AnalyticsService = {
  async trackPageView(userId: string, pageId: string) {
    // Log to Firebase Analytics
    logEvent(analytics, 'page_view', {
      page_id: pageId,
      user_id: userId
    });

    // Store in Firestore for detailed analytics
    await addDoc(collection(db, 'pageViews'), {
      userId,
      pageId,
      timestamp: Timestamp.now()
    });

    // Update aggregate metrics
    const metricsRef = doc(db, 'metrics', pageId);
    await runTransaction(db, async (transaction) => {
      const doc = await transaction.get(metricsRef);
      if (!doc.exists()) {
        transaction.set(metricsRef, { views: 1 });
      } else {
        transaction.update(metricsRef, { views: increment(1) });
      }
    });
  },

  async trackWorkoutCompletion(userId: string, workoutId: string, duration: number) {
    await addDoc(collection(db, 'workoutCompletions'), {
      userId,
      workoutId,
      duration,
      timestamp: Timestamp.now()
    });

    logEvent(analytics, 'workout_completed', {
      workout_id: workoutId,
      duration
    });
  },

  async getUserEngagement(userId: string, startDate?: Date, endDate?: Date) {
    const q = query(
      collection(db, 'pageViews'),
      where('userId', '==', userId),
      ...(startDate && endDate ? [
        where('timestamp', '>=', Timestamp.fromDate(startDate)),
        where('timestamp', '<=', Timestamp.fromDate(endDate))
      ] : [])
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    }));
  },

  async getContentPerformance(contentId: string) {
    const views = await getDocs(
      query(
        collection(db, 'pageViews'),
        where('pageId', '==', contentId)
      )
    );

    const completions = await getDocs(
      query(
        collection(db, 'workoutCompletions'),
        where('workoutId', '==', contentId)
      )
    );

    return {
      views: views.size,
      completions: completions.size
    };
  }
};