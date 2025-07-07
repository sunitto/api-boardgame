const Game = require('../models/game');
const { validationResult } = require('express-validator');

exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games', error });
  }
};

exports.getGameById = async (req, res) => {
  const gameId = req.params.id;
  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game', error });
  }
};

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
    res.status(500).json({ message: 'Error creating game', error });
  }
};

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
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(updatedGame);
  } catch (error) {
    res.status(500).json({ message: 'Error updating game', error });
  }
};
exports.deleteGame = async (req, res) => {
  const gameId = req.params.id;
  try {
    const deletedGame = await Game.findByIdAndDelete(gameId);
    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting game', error });
  }
};
