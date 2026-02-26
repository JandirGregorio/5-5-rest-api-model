const express = require('express');
const path = require('path');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');

// Auto-incrementing ID generator
const getId = ((id = 0) => () => ++id)();

// In Memory Database
const fellows = [
  { name: 'Carmen', id: getId() },
  { name: 'Reuben', id: getId() },
  { name: 'Maya', id: getId() },
];

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// Endpoints
////////////////////////

// Get All (Read)
const listFellows = (req, res) => {
  res.send(fellows);
};

// Get One (Read)
const findFellow = (req, res) => {
  const { id } = req.params;
  const fellow = fellows.find((fellow) => fellow.id === Number(id));

  if (!fellow) {
    return res.status(404).send({ message: `No fellow with the id ${id}` });
  }
  res.send(fellow);
};

// Create
const createFellow = (req, res) => {
  const { fellowName } = req.body;
  if (!fellowName) {
    return res.status(400).send({ message: 'Invalid Name' });
  }

  const newFellow = { name: fellowName, id: getId() };
  fellows.push(newFellow);
  res.send(newFellow);
};

// Update
const updateFellow = (req, res) => {
  const { fellowName } = req.body;
  if (!fellowName) {
    return res.status(400).send({ message: 'Invalid Name' });
  }

  const { id } = req.params;
  const fellow = fellows.find((fellow) => fellow.id === Number(id));

  if (!fellow) {
    return res.status(404).send({ message: `No fellow with the id ${id}` });
  }

  fellow.name = fellowName;
  res.send(fellow);
};

// Delete
const deleteFellow = (req, res) => {
  const { id } = req.params;
  const fellowIndex = fellows.findIndex((fellow) => fellow.id === Number(id));

  if (fellowIndex < 0) {
    return res.status(404).send({ message: `No fellow with the id ${id}` });
  }

  fellows.splice(fellowIndex, 1);
  res.sendStatus(204);
};

app.get('/api/fellows', listFellows);
app.get('/api/fellows/:id', findFellow);
app.post('/api/fellows', createFellow);
app.patch('/api/fellows/:id', updateFellow);
app.delete('/api/fellows/:id', deleteFellow);

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(path.join(pathToFrontend, 'index.html'));
});

const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
