const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const users = []; // demo only: in-memory, plain-text passwords

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required' });
  if (users.find(u => u.username === username))
    return res.status(409).json({ message: 'User already exists' });
  users.push({ username, password });
  res.status(201).json({ message: 'Registered successfully' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ message: 'Welcome ' + username });
});

app.get('/api/info', (req, res) => {
  res.json({ message: 'Welcome to the CODERWANDA web app' });
});

module.exports = app;