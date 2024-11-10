export type UserRole = 'user' | 'admin' | 'trainer';

export interface Permission {
  action: 'create' | 'read' | 'update' | 'delete';
  resource: 'content' | 'users' | 'analytics' | 'settings';
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}