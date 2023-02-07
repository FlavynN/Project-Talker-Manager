const express = require('express');
const path = require('path');
const fs = require('fs/promises');

const talkerRoute = express.Router();
const HTTP_OK_STATUS = 200;

talkerRoute.get('/', async (req, res) => {
  const talkerPath = path.resolve(__dirname, '../talker.json');
  const talker = await fs.readFile(talkerPath, 'utf8');
  const talkers = JSON.parse(talker);

  try {
    res.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    res.status(404).json([]);
  }
});

module.exports = talkerRoute;