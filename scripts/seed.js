import { db } from '../src/db/index.js';
import bcrypt from 'bcryptjs';

const seed = async () => {
  try {
    // Create admin user
    const passwordHash = await bcrypt.hash('admin123', 10);
    db.prepare(`
      INSERT INTO users (email, password_hash, name, role)
      VALUES (?, ?, ?, ?)
    `).run('admin@jmefit.com', passwordHash, 'Admin User', 'admin');

    // Add sample content
    db.prepare(`
      INSERT INTO content (
        title, slug, type, category, description, content,
        access_level, status, author_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      '5 Essential Core Exercises',
      'core-exercises',
      'article',
      'Fitness',
      'Build a strong core with these fundamental exercises',
      'Full article content here...',
      'free',
      'published',
      1
    );

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seed();