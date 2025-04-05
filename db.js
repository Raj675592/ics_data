// const { Pool } = require('pg');

// // 🔁 Replace this with your actual Neon DB connection string
// const pool = new Pool({
//   connectionString: 'postgresql://ICS%20IIT%20KANPUR_owner:npg_ANig5tnDrQM0@ep-aged-glitter-a525evvu-pooler.us-east-2.aws.neon.tech/ICS%20IIT%20KANPUR?sslmode=require',
//   ssl: { rejectUnauthorized: false }
// });

// module.exports = pool;
// pool.query('SELECT NOW()', (err, res) => {
//     if (err) {
//       console.error('Database connection error:', err);
//     } else {
//       console.log('Database connected:', res.rows);
//     }
//   });



// db.js







 require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // this will be set in Vercel
  ssl: {
    rejectUnauthorized: false,
  }
});

module.exports = pool;

