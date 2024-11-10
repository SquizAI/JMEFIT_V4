-- Content scheduling and versioning
CREATE TABLE IF NOT EXISTS scheduled_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_id INTEGER REFERENCES content(id) ON DELETE CASCADE,
  publish_at DATETIME NOT NULL,
  status TEXT CHECK(status IN ('pending', 'published', 'failed')) DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (content_id) REFERENCES content(id)
);

-- Media library
CREATE TABLE IF NOT EXISTS media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  size INTEGER NOT NULL,
  uploaded_by INTEGER REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Content media relationships
CREATE TABLE IF NOT EXISTS content_media (
  content_id INTEGER REFERENCES content(id) ON DELETE CASCADE,
  media_id INTEGER REFERENCES media(id) ON DELETE CASCADE,
  type TEXT CHECK(type IN ('featured', 'gallery', 'attachment')) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (content_id, media_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_scheduled_content_publish_at ON scheduled_content(publish_at);
CREATE INDEX IF NOT EXISTS idx_media_type ON media(type);
CREATE INDEX IF NOT EXISTS idx_media_uploaded_by ON media(uploaded_by);