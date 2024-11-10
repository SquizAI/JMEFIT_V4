import { db } from '../index';
import { format } from 'date-fns';

export const SchedulingModel = {
  scheduleContent: async (contentId: number, publishAt: Date) => {
    return db.prepare(`
      INSERT INTO scheduled_content (content_id, publish_at)
      VALUES (?, ?)
    `).run(contentId, format(publishAt, 'yyyy-MM-dd HH:mm:ss'));
  },

  getScheduledContent: () => {
    return db.prepare(`
      SELECT sc.*, c.title, c.type, c.category
      FROM scheduled_content sc
      JOIN content c ON sc.content_id = c.id
      WHERE sc.status = 'pending'
      ORDER BY sc.publish_at ASC
    `).all();
  },

  publishContent: async (contentId: number) => {
    const result = db.prepare(`
      UPDATE content
      SET status = 'published', updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(contentId);

    if (result.changes) {
      db.prepare(`
        UPDATE scheduled_content
        SET status = 'published', updated_at = CURRENT_TIMESTAMP
        WHERE content_id = ?
      `).run(contentId);
    }

    return result.changes > 0;
  }
};