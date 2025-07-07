jest.setTimeout(10000);

const mongoose = require('mongoose');
const request  = require('supertest');
const app      = require('../app');
beforeAll(async () => {
  await mongoose.connect(
    'mongodb://localhost:27017/boardgame_db_test',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API Boardgame CRUD', () => {
  let createdGameId;
//test pour la récupération de tous les jeux
  test('GET /api-boardgame/games -> 200 & array', async () => {
    const res = await request(app).get('/api-boardgame/games');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  //test pour la création d'une fiche de jeu
  test('POST /api-boardgame/games -> 201 & returns new game', async () => {
    const newGame = {
      title:       "Test Game",
      minPlayers:  2,
      maxPlayers:  4,
      playTime:    30,
      category:    "test",
      minAge:      8,
      price:       15
    };

    const res = await request(app)
      .post('/api-boardgame/games')
      .send(newGame);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(newGame.title.toLowerCase()); // toLowerCase dans ta validation
    createdGameId = res.body._id;
  });
//test pour la mise à jour d'une fiche de jeu
  test('PUT /api-boardgame/games/:id -> 200 & updates game', async () => {
    const updates = { price: 20 };

    const res = await request(app)
      .put(`/api-boardgame/games/${createdGameId}`)
      .send(updates);

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(20);
  });
// Test pour la suppression d'une fiche de jeu
  test('DELETE /api-boardgame/games/:id -> 200 & message', async () => {
    const res = await request(app)
      .delete(`/api-boardgame/games/${createdGameId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/supprimée/i);

  });
});
