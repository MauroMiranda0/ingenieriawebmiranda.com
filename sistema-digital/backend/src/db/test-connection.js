import 'dotenv/config';
import pool from './connection.js';

async function verificarConexion() {
  try {
    const { rows } = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM users) AS usuarios,
        (SELECT COUNT(*) FROM cases) AS casos,
        (SELECT COUNT(*) FROM case_history) AS historial,
        (SELECT COUNT(*) FROM events) AS eventos
    `);
    const { usuarios, casos, historial, eventos } = rows[0];
    console.log('Conexión exitosa a iwm_db');
    console.log(`  usuarios: ${usuarios}, casos: ${casos}, historial: ${historial}, eventos: ${eventos}`);
  } catch (err) {
    console.error('Error de conexión:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

verificarConexion();
