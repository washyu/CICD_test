const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'app_db',
  port: 5432
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Example API endpoint
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/items', async (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
