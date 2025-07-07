// on configure les routes pour le CRUD concernant game
// on va faire la route pour les GET, POST, PUT et DELETE
const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const { body } = require('express-validator');

router.get('/', gamesController.getAllGames); // GET all games

router.get('/:id', gamesController.getGameById); // GET game by ID

router.post('/',
  [
    body('title').trim().toLowerCase().notEmpty().withMessage('Title is required'),//on ajoute trim et toLowercase pour normaliser
    body('minPlayers').isInt({ min: 1 }).withMessage('Minimum players must be at least 1'),
    body('maxPlayers').isInt({ min: 1 }).withMessage('Maximum players must be at least 1'),
    body('playTime').isInt({ min: 1 }).withMessage('Play time must be at least 1 minute'),
    body('category').trim().toLowerCase().notEmpty().withMessage('Category is required'),//on ajoute trim et toLowercase pour normaliser
    body('minAge').isInt({ min: 0 }).withMessage('Minimum age must be a non-negative integer'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number')
  ],
  gamesController.createGame
); // POST creer une nouvelle entrée game

router.put('/:id',
  [
    body('title').optional().trim().toLowerCase().notEmpty().withMessage('Title is required'),//on ajoute trim et toLowercase pour normaliser
    body('minPlayers').optional().isInt({ min: 1 }).withMessage('Minimum players must be at least 1'),
    body('maxPlayers').optional().isInt({ min: 1 }).withMessage('Maximum players must be at least 1'),
    body('playTime').optional().isInt({ min: 1 }).withMessage('Play time must be at least 1 minute'),
    body('category').optional().trim().toLowerCase().notEmpty().withMessage('Category is required'),//on ajoute trim et toLowercase pour normaliser
    body('minAge').optional().isInt({ min: 0 }).withMessage('Minimum age must be a non-negative integer'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a non-negative number')
  ],
  gamesController.updateGame
); // PUT met à jour l'entrée game par son ID. Les optional sont là pour ne pas obliger l'utilisateur à renseigner tous les champs, mais vérifie quand même que les champs ne soient pas vides.

router.delete('/:id', gamesController.deleteGame); // DELETE supprime l'entrée game par son ID
module.exports = router; // on exporte le router pour l'utiliser dans le fichier app.js
