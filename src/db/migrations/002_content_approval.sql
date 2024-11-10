-- Content approvals table
CREATE TABLE IF NOT EXISTS content_approvals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_id INTEGER REFERENCES content(id) ON DELETE CASCADE,
  author_id INTEGER REFERENCES users(id),
  approver_id INTEGER REFERENCES users(id),
  status TEXT CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  feedback TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  approved_at DATETIME,
  rejected_at DATETIME
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_content_approvals_status ON content_approvals(status);
CREATE INDEX IF NOT EXISTS idx_content_approvals_content ON content_approvals(content_id);
CREATE INDEX IF NOT EXISTS idx_content_approvals_author ON content_approvals(author_id);