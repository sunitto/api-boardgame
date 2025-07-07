const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  minPlayers: { type: Number, required: true },
  maxPlayers: { type: Number, required: true },
  playTime: { type: Number },
  category: { type: String, required: true },
  mechanics: { type: String },
  minAge: { type: Number }
});

module.exports = mongoose.model('Game', gameSchema);
