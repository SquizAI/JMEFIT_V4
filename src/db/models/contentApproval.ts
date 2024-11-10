import db from '../index';

export const ContentApprovalModel = {
  submitForApproval: (contentId: number, authorId: number) => {
    return db.prepare(`
      INSERT INTO content_approvals (content_id, author_id, status)
      VALUES (?, ?, 'pending')
    `).run(contentId, authorId);
  },

  approve: (approvalId: number, approverId: number) => {
    const approval = db.prepare(`
      UPDATE content_approvals
      SET status = 'approved', approver_id = ?, approved_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(approverId, approvalId);

    if (approval.changes) {
      // Update content status to published
      db.prepare(`
        UPDATE content
        SET status = 'published'
        WHERE id = (SELECT content_id FROM content_approvals WHERE id = ?)
      `).run(approvalId);
    }

    return approval;
  },

  reject: (approvalId: number, approverId: number, feedback: string) => {
    return db.prepare(`
      UPDATE content_approvals
      SET status = 'rejected', approver_id = ?, feedback = ?, rejected_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(approverId, feedback, approvalId);
  },

  getPending: () => {
    return db.prepare(`
      SELECT ca.*, c.title, c.type, u.name as author_name
      FROM content_approvals ca
      JOIN content c ON ca.content_id = c.id
      JOIN users u ON ca.author_id = u.id
      WHERE ca.status = 'pending'
      ORDER BY ca.created_at DESC
    `).all();
  }
};