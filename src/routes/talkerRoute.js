const express = require('express');
const talkerRead = require('../utils/talkerRead');
const talkerWrite = require('../utils/talkerWrite');
const { auth, validatonName, validationAge,
  validateTalk, validateWatchedAt,
  validateRate } = require('../middlewares/validatorTalker');

const talkerRoute = express.Router();
const HTTP_OK_STATUS = 200;

talkerRoute.get('/', async (req, res) => {
  const talker = await talkerRead();
  try {
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    res.status(404).json([]);
  }
});

talkerRoute.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const talkers = await talkerRead();
  const talkerFind = talkers.find((t) => t.id === id);
  if (talkerFind) {
    res.status(HTTP_OK_STATUS).json(talkerFind);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

talkerRoute.post('/', auth, validatonName, validationAge, validateTalk,
  validateWatchedAt, validateRate, async (req, res) => {
    const talkers = await talkerRead();
    const newTalker = { id: talkers.length + 1, ...req.body };
    await talkerWrite([...talkers, newTalker]);
    res.status(201).json(newTalker);
  });

module.exports = talkerRoute;