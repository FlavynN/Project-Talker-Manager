const validationEmail = (req, res, next) => {
  const { email } = req.body;

  if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    next();
  } else {
    res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
};

const validationLogin = (req, res, next) => {
  const requiredProperties = ['email', 'password'];
  if (requiredProperties.every((property) => property in req.body)) {
    next();
  } if (!req.body.email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
};

const validationPassword = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

module.exports = { validationEmail, validationLogin, validationPassword };