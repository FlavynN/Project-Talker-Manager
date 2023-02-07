const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const talkerRoute = express.Router();
const HTTP_OK_STATUS = 200;

const talkerRouteFile = async () => {
  const talkerPath = path.resolve(__dirname, '../talker.json');
  try {
    const talker = await fs.readFile(talkerPath, 'utf8');
    return JSON.parse(talker);
  } catch (error) {
    return null;
  }
};

talkerRoute.get('/', async (req, res) => {
  const talker = await talkerRouteFile();
  try {
    res.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    res.status(404).json([]);
  }
});

talkerRoute.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const talkers = await talkerRouteFile();
  const talkerFind = talkers.find((t) => t.id === id);
  if (talkerFind) {
    res.status(HTTP_OK_STATUS).json(talkerFind);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

module.exports = talkerRoute;