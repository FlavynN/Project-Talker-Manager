const express = require('express');
const { tokenGenerator } = require('../utils/token');

const loginRoute = express.Router();
const HTTP_OK_STATUS = 200;

loginRoute.post('/', async (req, res) => {
  const token = { token: tokenGenerator() };
  res.status(HTTP_OK_STATUS).json(token);
});

module.exports = loginRoute;