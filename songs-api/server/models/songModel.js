let id = 0;
const getId = () => id++;

// Restrict access to our mock "database" to just this Model file

/**
 * get all (list)
 * get one (find)
 * create
 * update
 * delete/destroy
 */
const songs = [
  { artist: 'Carmen', title: 'Awkward', id: getId() },
  { artist: 'Pinkpanthers', title: 'Stateside', id: getId() },
  { artist: 'Miami XO', title: 'Bazooka', id: getId() },
  { artist: 'Canserbero', title: 'mañana sera otro dia', id: getId() },
  { artist: 'MJ', title: 'Billie Jean', id: getId() },
];

// Can be used like "fellowModel.create()"
module.exports.create = (title, artist) => {
  if (!title || !artist) return null;
  const newSong = { artist, title, id: getId() };
  fellows.push(newSong);
  return {... newSong };
};

module.exports.list = () => {
  return [...songs];
};

module.exports.find = (id) => {
  const song = songs.find((song) => song.id === id);
  if (!song) {
    return null;
  }
  return { ...song };
};

module.exports.update = (id, title, artist) => {
  const song = songs.find((song) => song.id === id);
  if (!song) return null;
  song.title = title;
  song.artist = artist;
  return { ...song };
};

module.exports.destroy = (id) => {
  const songIndex = songs.findIndex((song) => song.id === id);
  if (songIndex < 0) {
    return false;
  }
  songs.splice(songIndex, 1);
  return true;
};
