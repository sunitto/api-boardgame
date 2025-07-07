// on va maintenant configurer le serveur express
const express = require('express');
const mongoose = require('mongoose');
const gameRoutes = require('./routes/gameRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/boardgame_db';

app.use(express.json()); // Middleware pour parser le JSON dans les requêtes
app.use('/api-boardgame/games', gameRoutes); // route principale pour les jeux

// Connexion à la base de données MongoDB
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log("Connecté à MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error("Erreur de connection à MongoDB", err);
});
