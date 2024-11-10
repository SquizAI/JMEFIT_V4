import db from '../index';

export const AnalyticsModel = {
  trackContentView: (contentId: number, userId?: number) => {
    const date = new Date().toISOString().split('T')[0];
    
    // Update or insert content analytics
    db.prepare(`
      INSERT INTO content_analytics (content_id, date, views)
      VALUES (?, ?, 1)
      ON CONFLICT(content_id, date) DO UPDATE SET
      views = views + 1
    `).run(contentId, date);

    // Track user analytics if user is logged in
    if (userId) {
      db.prepare(`
        INSERT INTO user_analytics (user_id, event_type, event_data)
        VALUES (?, 'content_view', ?)
      `).run(userId, JSON.stringify({ contentId, date }));
    }
  },

  getContentAnalytics: (contentId: number, startDate: string, endDate: string) => {
    return db.prepare(`
      SELECT date, views, likes, shares, avg_time_spent
      FROM content_analytics
      WHERE content_id = ? AND date BETWEEN ? AND ?
      ORDER BY date ASC
    `).all(contentId, startDate, endDate);
  },

  getUserAnalytics: (userId: number, eventType?: string) => {
    const query = eventType
      ? `SELECT * FROM user_analytics WHERE user_id = ? AND event_type = ? ORDER BY created_at DESC`
      : `SELECT * FROM user_analytics WHERE user_id = ? ORDER BY created_at DESC`;
    
    return db.prepare(query).all(userId, eventType);
  }
};