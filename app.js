// app.js – configure uniquement Express
const express = require('express');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

app.use(express.json());
app.use('/api-boardgame/games', gameRoutes);

module.exports = app;
