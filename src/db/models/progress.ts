import { db } from '../index';

export interface Progress {
  id?: number;
  user_id: number;
  content_id: number;
  progress: number;
  completed?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const ProgressModel = {
  create(progress: Omit<Progress, 'id' | 'created_at' | 'updated_at'>): Progress {
    const result = db.run(
      `INSERT INTO user_progress (user_id, content_id, progress, completed)
       VALUES (?, ?, ?, ?)`,
      [
        progress.user_id,
        progress.content_id,
        progress.progress,
        progress.completed || false
      ]
    );
    return { ...progress, id: result.lastInsertRowid as number };
  },

  updateProgress(id: number, progress: number, completed: boolean): void {
    db.run(
      `UPDATE user_progress 
       SET progress = ?, completed = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [progress, completed, id]
    );
  },

  getUserProgress(userId: number): Progress[] {
    return db.all('SELECT * FROM user_progress WHERE user_id = ?', [userId]);
  }
};