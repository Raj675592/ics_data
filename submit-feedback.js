// api/submit-feedback.js
const pool = require('./db');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, rollno, feedback } = req.body;

    try {
      await pool.query(
        'INSERT INTO feedbacks (name, email, rollno, feedback) VALUES ($1, $2, $3, $4)',
        [name, email, rollno, feedback]
      );
      res.status(200).json({ message: '✅ Feedback submitted successfully!' });
    } catch (err) {
      console.error('❌ DB Error:', err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
