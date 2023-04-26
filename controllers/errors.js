const { NOT_FOUND } = require('../constants');

module.exports.handleNotFound = (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
};
