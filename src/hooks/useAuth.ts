import { useState, useEffect } from 'react';
import { User, Permission } from '../types/auth';
import { db } from '../db';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkPermission = (permission: Permission) => {
    if (!user) return false;
    
    // Admins have all permissions
    if (user.role === 'admin') return true;

    return user.permissions.some(
      p => p.action === permission.action && p.resource === permission.resource
    );
  };

  const login = async (email: string, password: string) => {
    try {
      // Add your authentication logic here
      const user = await db.prepare(
        'SELECT * FROM users WHERE email = ?'
      ).get(email);

      if (!user) {
        throw new Error('User not found');
      }

      // Verify password and set user
      setUser(user);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    checkPermission
  };
};