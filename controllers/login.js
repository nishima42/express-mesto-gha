const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BAD_REQUEST } = require('../constants');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, 'key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 86400 * 7,
          httpOnly: true,
        })
        .send({ token });
    })
    .catch((err) => {
      res.status(BAD_REQUEST).send({ message: err.message });
    });
};
