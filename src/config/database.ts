import { db, query, getOne, getAll } from '../db';

export const DatabaseService = {
  // User operations
  createUser: (userData) => {
    const sql = `
      INSERT INTO users (id, email, name, role)
      VALUES (?, ?, ?, ?)
    `;
    return query(sql, [userData.id, userData.email, userData.name, userData.role]);
  },

  getUserById: (id) => {
    return getOne('SELECT * FROM users WHERE id = ?', [id]);
  },

  // Content operations
  createContent: (contentData) => {
    const sql = `
      INSERT INTO content (id, title, content, type, category, status, author_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    return query(sql, [
      contentData.id,
      contentData.title,
      contentData.content,
      contentData.type,
      contentData.category,
      contentData.status,
      contentData.authorId
    ]);
  },

  getContentById: (id) => {
    return getOne('SELECT * FROM content WHERE id = ?', [id]);
  },

  getAllContent: (filters = {}) => {
    let sql = 'SELECT * FROM content';
    const params = [];

    if (filters.category) {
      sql += ' WHERE category = ?';
      params.push(filters.category);
    }

    sql += ' ORDER BY created_at DESC';

    return getAll(sql, params);
  },

  // Media operations
  createMedia: (mediaData) => {
    const sql = `
      INSERT INTO media (id, filename, url, type, size, uploaded_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    return query(sql, [
      mediaData.id,
      mediaData.filename,
      mediaData.url,
      mediaData.type,
      mediaData.size,
      mediaData.uploadedBy
    ]);
  },

  getMediaById: (id) => {
    return getOne('SELECT * FROM media WHERE id = ?', [id]);
  }
};

export { db };