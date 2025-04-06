require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // this will be set in Vercel
  ssl: {
    rejectUnauthorized: false,
  }
});

module.exports = pool;

