const Card = require('../models/card');

const {
  badRequestCode,
  notFoundCode,
  serverError,
} = require('../constants');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({
      createdAt: card.createdAt,
      likes: card.likes,
      link: card.link,
      name: card.name,
      owner: card.owner,
      _id: card._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(badRequestCode).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(serverError).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(notFoundCode).send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.send({ message: 'Пост удалён' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(badRequestCode).send({ message: 'Переданы некорректные данные карточки' });
      }
      return res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(notFoundCode).send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.send({
          createdAt: card.createdAt,
          likes: card.likes,
          link: card.link,
          name: card.name,
          owner: card.owner,
          _id: card._id,
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(badRequestCode).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      }
      return res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(notFoundCode).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.send({
        createdAt: card.createdAt,
        likes: card.likes,
        link: card.link,
        name: card.name,
        owner: card.owner,
        _id: card._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(badRequestCode).send({ message: 'Переданы некорректные данные для снятия лайка.' });
      }
      return res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};
