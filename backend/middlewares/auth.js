const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    throw new AuthError('Необходима авторизация');
  } else {
    const token = authorization;
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      console.error(err);
      throw new AuthError('Необходима авторизация');
    }
    req.user = payload;
    next();
  }
};
