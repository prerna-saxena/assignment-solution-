const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'your_database_name'
});

// Middleware
app.use(bodyParser.json());

// Get all components
app.get('/components', (req, res) => {
  const query = 'SELECT * FROM components';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update component content by ID
app.put('/components/:id', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const query = 'UPDATE components SET content = ? WHERE id = ?';
  db.query(query, [content, id], (err, result) => {
    if (err) throw err;
    res.send('Component updated successfully');
  });
});

// Delete component by ID
app.delete('/components/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM components WHERE id = ?';
  db.query(query, id, (err, result) => {
    if (err) throw err;
    res.send('Component deleted successfully');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
