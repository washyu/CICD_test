const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Create database connection
const createDbConnection = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'demodb'
  });
};

// Create Express app
const createApp = (db) => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Routes
  app.get('/api/notes', (req, res) => {
    db.query('SELECT * FROM notes', (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  });

  app.post('/api/notes', (req, res) => {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    db.query('INSERT INTO notes (content) VALUES (?)', [content], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: result.insertId, content });
    });
  });

  app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Note ID is required' });
    }

    db.query('DELETE FROM notes WHERE id = ?', [id], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Note not found' });
      }

      res.json({ message: 'Note deleted successfully' });
    });
  });

  return app;
};

// Only start the server if this file is run directly
if (require.main === module) {
  const db = createDbConnection();
  const app = createApp(db);
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = { createApp, createDbConnection };