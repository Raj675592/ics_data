const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db'); // Import the database connection from db.js
const cors = require('cors');
app.use(cors());

const app = express();
const PORT = 5500;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Handle POST requests to /submit-feedback
app.post('/submit-feedback', async (req, res) => {
  const feedback = req.body;

  // Validate the received data
  if (!feedback.roll_no || !feedback.name || !feedback.email || !feedback.message || !feedback.rating) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Insert feedback into the database
    const query = `
      INSERT INTO feedback (roll_no, name, email, message, rating, is_anonymous)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      feedback.roll_no,
      feedback.name,
      feedback.email,
      feedback.message,
      feedback.rating,
      feedback.is_anonymous
    ];

    const result = await pool.query(query, values);

    // Send a success response
    res.json({ success: true, message: 'Feedback submitted successfully!', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting feedback:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
