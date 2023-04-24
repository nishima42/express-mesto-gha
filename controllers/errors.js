const { notFoundCode } = require('../constants');

module.exports.handleNotFound = (req, res) => {
  res.status(notFoundCode).send({ message: 'Запрашиваемый ресурс не найден' });
};