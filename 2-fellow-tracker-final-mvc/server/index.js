const express = require('express');
const path = require('path');

// Instead of defining all of the controllers in this file, we've moved them to their own folder
const {
  listFellows,
  findFellow,
  createFellow,
  updateFellow,
  deleteFellow
} = require('./controllers/fellowControllers');

const app = express();
let pathToFrontend = path.join(__dirname, '../frontend');
if (process.env.NODE_ENV === 'production') {
  pathToFrontend = path.join(__dirname, '../frontend/dist');
}

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

app.get('/api/fellows', listFellows);
app.get('/api/fellows/:id', findFellow);
app.post('/api/fellows', createFellow);
app.patch('/api/fellows/:id', updateFellow);
app.delete('/api/fellows/:id', deleteFellow);

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(pathToFrontend + '/index.html');
});


const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));