const mongoose = require('mongoose');
// ci dessous le schema pour le modèle Game concernant les jeux de société
const gameSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String}, // pitch du jeu
  image: { type: String }, // URL de l'image du jeu
  minPlayers: { type: Number, required: true }, // nombre minimum de joueurs
  maxPlayers: { type: Number, required: true }, // nombre maximum de joueurs
  playTime: { type: Number, required: true }, // en minutes
  category: { type: String, required: true }, // catégorie du jeu (ex: familiale, ambiance, expert, initié, etc.)
  mechanics: { type: String }, // informations non obligatoire sur les mécaniques du jeu
  minAge: { type: Number, required: true }, // âge minimum recommandé
  price: { type: Number, required: true }, // prix du jeu
});
// ci dessous on exporte le modèle Game
// pour l'utiliser dans d'autres parties de l'application
module.exports = mongoose.model('Game', gameSchema);
