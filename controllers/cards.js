const Card = require('../models/card');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

const { CREATED } = require('../constants');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => Card.findById(card._id).populate(['owner', 'likes']))
    .then((card) => res.status(CREATED).send({
      createdAt: card.createdAt,
      likes: card.likes,
      link: card.link,
      name: card.name,
      owner: card.owner,
      _id: card._id,
    }))
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        // res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена.' });
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        // res.status(403).send({ message: 'Вы не можете удалить эту карточку' });
        throw new ForbiddenError('Вы не можете удалить эту карточку');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => {
          res.send({ message: 'Пост удалён' });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
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
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
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
    .catch(next);
};
