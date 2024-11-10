export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Content {
  id: string;
  title: string;
  content: string;
  type: 'article' | 'video' | 'workout' | 'recipe';
  category: string;
  status: 'draft' | 'published' | 'archived';
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: string;
  filename: string;
  url: string;
  type: string;
  size: number;
  uploaded_by: string;
  created_at: string;
}