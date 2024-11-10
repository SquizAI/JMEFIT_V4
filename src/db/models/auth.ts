import { db } from '../index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 10;

export const AuthModel = {
  async createUser(email: string, password: string, name: string, role: string = 'user') {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    
    return db.prepare(`
      INSERT INTO users (email, password_hash, name, role)
      VALUES (?, ?, ?, ?)
    `).run(email, passwordHash, name, role);
  },

  async validateUser(email: string, password: string) {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return null;
    
    return user;
  },

  createSession(userId: number) {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    db.prepare(`
      INSERT INTO sessions (user_id, token, expires_at)
      VALUES (?, ?, ?)
    `).run(userId, token, expiresAt.toISOString());

    return token;
  },

  validateSession(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      const session = db.prepare(`
        SELECT * FROM sessions 
        WHERE token = ? AND expires_at > datetime('now')
      `).get(token);

      if (!session) return null;

      return db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.userId);
    } catch (err) {
      return null;
    }
  },

  invalidateSession(token: string) {
    return db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
  }
};