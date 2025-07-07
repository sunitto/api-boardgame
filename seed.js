const mongoose = require('mongoose');
const Game = require('./models/game');

const gamesData = [
  {
    title: "Catan",
    description: "Le classique du jeu de société. 2changez, négociez les ressources et batissez votre colonie.",
    image: "",
    minPlayers: 3,
    maxPlayers: 4,
    playTime: 60,
    category: "familial",
    mechanics: "hasard, gestion de ressources, négociation",
    minAge: 10,
    price: 40
  },

  {
    title: "Les aventuriers du rail",
    description: "Classique du jeu de société. Collectez des cartes, batissez vos chemins et validez des objectifs de voyage",
    image: "",
    minPlayers: 2,
    maxPlayers: 5,
    playTime: 30,
    category: "Familial",
    mechanics: "construction de réseau, validation d'objectifs",
    minAge: 8,
    price: 45
  },

  {
    title: "7 Wonders",
    description: "Le classique du jeu de draft. Construisez votre civilisation aux travers des âges en collectant des cartes.",
    image: "",
    minPlayers: 3,
    maxPlayers: 7,
    playTime: 30,
    category: "initié",
    mechanics: "draft",
    minAge: 10,
    price: 50
  },

  {
    title: "Pandemic",
    description: "Un jeu coopératif où les joueurs travaillent ensemble pour éradiquer des maladies à travers le monde. Gérez vos points d'actions efficacement.",
    image: "",
    minPlayers: 2,
    maxPlayers: 4,
    playTime: 45,
    category: "initié",
    mechanics: "coopération, gestion de cartes, gestion de points d'actions",
    minAge: 8,
    price: 40
  },

  {
    title: "Carcassonne",
    description: "Un jeu de tuiles où les joueurs construisent un paysage médiéval en plaçant des tuiles et en plaçant des partisans pour marquer des points.",
    image: "",
    minPlayers: 2,
    maxPlayers: 5,
    playTime: 35,
    category: "familial",
    mechanics: "placement de tuiles, contrôle de territoire",
    minAge: 7,
    price: 35
  },

  {
    title: "Terraforming Mars",
    description: "Un jeu de stratégie où les joueurs incarnent des corporations qui terraforment Mars en jouant des cartes et en gérant des ressources. Incontrounable des jeux experts.",
    image: "",
    minPlayers: 1,
    maxPlayers: 5,
    playTime: 120,
    category: "expert",
    mechanics: "gestion de ressources, développement de cartes, draft",
    minAge: 12,
    price: 60
  },

  {
    title: "Zombie Kidz Evolution",
    description: "Un jeu coopératif pour les enfants où les joueurs doivent défendre leur école contre des zombies. Les joueurs peuvent améliorer leurs personnages au fil des parties.",
    image: "",
    minPlayers: 2,
    maxPlayers: 4,
    playTime: 20,
    category: "enfant",
    mechanics: "coopération, légacy",
    minAge: 7,
    price: 30
  },
  {
    title: "Splendor",
    description: "Un jeu de stratégie où les joueurs collectent des jetons pour acheter des cartes de développement et gagner des points de prestige.",
    image: "",
    minPlayers: 2,
    maxPlayers: 4,
    playTime: 30,
    category: "familial",
    mechanics: "moteur de ressources, gestion de ressources",
    minAge: 10,
    price: 35
  }
];

const MONGODB_URI = 'mongodb://localhost:27017/boardgame';
async function seedDB() {
  try {
    // Connection à la base de données MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // On nettoie la collection
    await Game.deleteMany({});

    // On charge les données dans la collection
    await Game.insertMany(gamesData);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Fin de connection
    await mongoose.connection.close();
  }
}

seedDB();
