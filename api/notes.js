const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API Routes
app.get('/api/notes', (req, res) => {
  // Implement logic to retrieve notes from the database and send them as JSON
  // Example: Read notes from db.json file and send them as response
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      const notes = JSON.parse(data);
      const newNote = req.body;
      newNote.id = uuidv4(); // Generate unique id
      notes.push(newNote);
      fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json(newNote);
      });
    });
  });
  
