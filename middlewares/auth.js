const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new Error('Необходима авторизация');
    err.statusCode = UNAUTHORIZED;
    next(err);
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, 'key');
  } catch (err) {
    err.statusCode = UNAUTHORIZED;
    next(err);
    return;
  }

  req.user = payload;

  next();
};
