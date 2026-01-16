// app/api/lib/mysql.ts

import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || '159.198.68.90',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'isaac',
  password: process.env.DB_PASSWORD || 'Isaac@Secure123',
  database: process.env.DB_NAME || 'takeover_training_program',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};


// Create connection pool
const pool = mysql.createPool(dbConfig);



export { pool as db };
