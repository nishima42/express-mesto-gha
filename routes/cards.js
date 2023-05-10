const cards = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidation,
  cardIdValidation,
} = require('../middlewares/validation');

cards.get('/', getCards);
cards.post('/', createCardValidation, createCard);
cards.delete('/:cardId', cardIdValidation, deleteCard);
cards.put('/:cardId/likes', cardIdValidation, likeCard);
cards.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = cards;
