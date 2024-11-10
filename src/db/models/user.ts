import { db } from '../index';

export interface User {
  id?: number;
  email: string;
  password: string;
  role?: string;
  created_at?: string;
}

export const UserModel = {
  create(user: Omit<User, 'id' | 'created_at'>): User {
    const result = db.run(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [user.email, user.password, user.role || 'user']
    );
    return { ...user, id: result.lastInsertRowid as number };
  },

  findByEmail(email: string): User | undefined {
    return db.get('SELECT * FROM users WHERE email = ?', [email]);
  },

  findById(id: number): User | undefined {
    return db.get('SELECT * FROM users WHERE id = ?', [id]);
  },

  updateRole(id: number, role: string): void {
    db.run('UPDATE users SET role = ? WHERE id = ?', [role, id]);
  }
};