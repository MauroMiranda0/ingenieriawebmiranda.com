import { query } from '../db/connection.js';

export const userRepository = {
  async buscarPorEmail(email) {
    const { rows } = await query(
      'SELECT id, email, password_hash, role FROM users WHERE email = $1 LIMIT 1',
      [email]
    );
    return rows[0] || null;
  },

  async buscarPorId(id) {
    const { rows } = await query(
      'SELECT id, email, role, created_at FROM users WHERE id = $1 LIMIT 1',
      [id]
    );
    return rows[0] || null;
  },
};
