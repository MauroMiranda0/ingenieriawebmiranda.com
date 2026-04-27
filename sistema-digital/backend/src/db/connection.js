import pg from 'pg';
import { logger } from '../utils/logger.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  logger.error('Error inesperado en pool de PostgreSQL', { error: err.message });
});

export const query = (text, params) => pool.query(text, params);

export const getClient = () => pool.connect();

export default pool;
