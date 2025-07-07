const mongoose = require('mongoose');
const app = require("./app"); // Importation de l'application Express
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/boardgame_db';

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
