import { db } from '../index';

export const MediaModel = {
  createMedia: (data: {
    filename: string;
    url: string;
    type: string;
    size: number;
    uploaded_by: number;
  }) => {
    return db.prepare(`
      INSERT INTO media (filename, url, type, size, uploaded_by)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      data.filename,
      data.url,
      data.type,
      data.size,
      data.uploaded_by
    );
  },

  getMediaByUser: (userId: number) => {
    return db.prepare(`
      SELECT * FROM media
      WHERE uploaded_by = ?
      ORDER BY created_at DESC
    `).all(userId);
  },

  attachMediaToContent: (contentId: number, mediaId: number, type: string) => {
    return db.prepare(`
      INSERT INTO content_media (content_id, media_id, type)
      VALUES (?, ?, ?)
    `).run(contentId, mediaId, type);
  },

  getContentMedia: (contentId: number) => {
    return db.prepare(`
      SELECT m.*, cm.type as usage_type
      FROM media m
      JOIN content_media cm ON m.id = cm.media_id
      WHERE cm.content_id = ?
    `).all(contentId);
  }
};