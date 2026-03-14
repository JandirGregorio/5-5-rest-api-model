const songModel = require('../models/songModel.js');

/*
These controllers take incoming requests and utilize the
methods provided by fellowModel before sending a
response back to the client (or an error message).
*/

// Get All (Read)
module.exports.listSongs = (req, res) => {
  const songsList = songModel.list();
  res.send(songsList);
};

// Get One (Read)
module.exports.findSong = (req, res) => {
  const { id } = req.params;
  const song = songModel.find(Number(id));

  if (!song) {
    return res.status(404).send({
      message: `No song with the id ${id}`
    });
  }
  res.send(song);
};

// Create
// POST /api/songs + { artist, title }
module.exports.createSong = (req, res) => {
  const { artist, title } = req.body;
  if (!title.trim() || !artist.trim()) {
    return res.status(400).send({ message: "Title and artist are needed" });
  }

  const newSong = songModel.create(title, artist);
  res.send(newSong);
};

// Update PATCH /api/songs/:id + { artist, title }
module.exports.updateSong = (req, res) => {
  const { title, artist } = req.body;

  if (!title?.trim() || !artist?.trim()) {
    return res.status(400).send({ message: "Title and Artist are required" });
  }

  const { id } = req.params;
  const updatedSong = songModel.update(Number(id), title, artist);

  if (!updatedSong) {
    return res.status(404).send({
      message: `No song with the id ${id}`
    });
  }

  res.send(updatedSong);
};

// Delete
module.exports.deleteSong = (req, res) => {
  const { id } = req.params;
  const didDelete = songModel.destroy(Number(id));

  if (!didDelete) {
    return res.status(404).send({
      message: `No song with the id ${id}`
    });
  }

  res.sendStatus(204);
};
