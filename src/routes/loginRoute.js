const express = require('express');
const { tokenGenerator } = require('../utils/token');
const { validationEmail, validationLogin,
  validationPassword } = require('../middlewares/validatorLogin');

const loginRoute = express.Router();
const HTTP_OK_STATUS = 200;

loginRoute.post('/', validationLogin, validationEmail, validationPassword, async (_req, res) => {
  const token = { token: tokenGenerator() };
  res.status(HTTP_OK_STATUS).json(token);
});

module.exports = loginRoute;