import { initDB } from '../src/db/index.js';

console.log('Running database migrations...');

try {
  await initDB();
  console.log('Migrations completed successfully');
} catch (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}