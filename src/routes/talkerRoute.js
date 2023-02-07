const express = require('express');
const talkerRead = require('../utils/talkerRead');
const talkerWrite = require('../utils/talkerWrite');
const { auth, validatonName, validationAge,
  validateTalk, validateWatchedAt,
  validateRate } = require('../middlewares/validatorTalker');

const talkerRoute = express.Router();
const HTTP_OK_STATUS = 200;

talkerRoute.get('/', async (_req, res) => {
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

talkerRoute.put('/:id', auth, validatonName, validationAge, validateTalk,
  validateWatchedAt, validateRate, async (req, res) => {
    try {
      const { id } = req.params;
      const { name, age, talk } = req.body;
      const talkers = await talkerRead();
      const index = talkers.findIndex((element) => element.id === Number(id));
      talkers[index] = { id: Number(id), name, age, talk };
      await talkerWrite([...talkers, talkers[index]]);
      return res.status(200).json(talkers[index]);
    } catch (error) {
      return null;
    }
  });

talkerRoute.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await talkerRead();
    const filteredID = talkers.findIndex((element) => element.id !== Number(id));
    await talkerWrite(filteredID);
    return res.status(204).json();
  } catch (error) {
    return null;
  }
});

// talkerRoute.get('/search?q=searchTerm', async (req, res) => {

// });

module.exports = talkerRoute;