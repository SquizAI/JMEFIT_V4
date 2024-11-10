import db from '../index';

export const UserProgressModel = {
  create: (userId: number, data: {
    weight?: number;
    bodyFat?: number;
    notes?: string;
  }) => {
    return db.prepare(`
      INSERT INTO user_progress (user_id, date, weight, body_fat, notes)
      VALUES (?, DATE('now'), ?, ?, ?)
    `).run(userId, data.weight, data.bodyFat, data.notes);
  },

  getProgress: (userId: number, startDate?: string, endDate?: string) => {
    let query = `
      SELECT * FROM user_progress
      WHERE user_id = ?
    `;

    if (startDate && endDate) {
      query += ` AND date BETWEEN ? AND ?`;
      return db.prepare(query).all(userId, startDate, endDate);
    }

    return db.prepare(query).all(userId);
  },

  getLatest: (userId: number) => {
    return db.prepare(`
      SELECT * FROM user_progress
      WHERE user_id = ?
      ORDER BY date DESC
      LIMIT 1
    `).get(userId);
  }
};