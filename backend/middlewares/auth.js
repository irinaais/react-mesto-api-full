const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../utils/constants');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'a89d0755fca60ef856a81a8232e825ccec62fe1398058b1b9e8c80cc4edf01ca');
    } catch (err) {
      console.error(err);
      throw new AuthError('Необходима авторизация');
    }
    req.user = payload;
    next();
  }
};

// const { JWT_SECRET } = process.env;
//
// module.exports = (req, res, next) => {
//   const authorization = req.cookies.jwt;
//
//   if (!authorization) {
//     throw new AuthError('Необходима авторизация');
//   } else {
//     const token = authorization;
//     let payload;
//     try {
//       payload = jwt.verify(token, JWT_SECRET);
//     } catch (err) {
//       console.error(err);
//       throw new AuthError('Необходима авторизация');
//     }
//     req.user = payload;
//     next();
//   }
// };
