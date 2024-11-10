export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface Content {
  id: number;
  title: string;
  slug: string;
  type: 'article' | 'video' | 'workout' | 'recipe';
  category: string;
  description: string | null;
  content: string;
  access_level: 'free' | 'premium';
  status: 'draft' | 'published' | 'archived';
  author_id: number;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: number;
  user_id: number;
  content_id: number;
  progress: number;
  completed: boolean;
  last_accessed: string;
}