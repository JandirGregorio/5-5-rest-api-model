const express = require('express');
const path = require('path');

// Instead of defining all of the controllers in this file, we've moved them to their own folder
const songControllers = require('./controllers/songControllers');

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

app.get('/api/songs', songControllers.listSongs);
app.get('/api/songs/:id', songControllers.findSong);
app.post('/api/songs', songControllers.createSong);
app.patch('/api/songs/:id', songControllers.updateSong);
app.delete('/api/songs/:id', songControllers.deleteSong);

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(pathToFrontend + '/index.html');
});


const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));