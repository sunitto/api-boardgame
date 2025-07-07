// ici le controller qui va permettre de gérer notre CRUD concernant les jeux de société/modèle Game
const Game = require('../models/game');
const { validationResult } = require('express-validator');

// ici qui correspond à un GET pour récupérer l'index de tous les jeux. C'est le def index d'un projet ruby on rails
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des fiches de jeux", error });
  }
};
// ici, le GET pour récupérer une entrée spécifique par ID. C'est le def show d'un projet ruby on rails
exports.getGameById = async (req, res) => {
  const gameId = req.params.id;
  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Fiche de jeu non trouvée" });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupétation des fiches de jeux", error });
  }
};
// POST pour créer un nouveau game/jeu. C'est le def create d'un projet ruby on rails
exports.createGame = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const gameData = req.body;
  try {
    const newGame = new Game(gameData);
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ message: "Erreur de création de la fiche jeu", error });
  }
};

// PUT pour mettre à jour un jeu existant. C'est le def update d'un projet ruby on rails
exports.updateGame = async (req, res) => {
  const gameId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const gameData = req.body;
  try {
    const updatedGame = await Game.findByIdAndUpdate(gameId, gameData, { new: true });
    if (!updatedGame) {
      return res.status(404).json({ message: "Fiche de jeu non trouvée" });
    }
    res.status(200).json(updatedGame);
  } catch (error) {
    res.status(500).json({ message: "Erreur de mise à jour de la fiche de jeu", error });
  }
};

// DELETE pour supprimer un jeu. C'est le def destroy d'un projet ruby on rails
exports.deleteGame = async (req, res) => {
  const gameId = req.params.id;
  try {
    const deletedGame = await Game.findByIdAndDelete(gameId);
    if (!deletedGame) {
      return res.status(404).json({ message: "Fiche de jeu non trouvée" });
    }
    res.status(200).json({ message: "Fiche de jeu supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la fiche de jeu", error });
  }
};
