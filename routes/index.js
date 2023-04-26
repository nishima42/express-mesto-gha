const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');
const { handleNotFound } = require('../controllers/errors');

router.use('/user', users);
router.use('/cards', cards);
router.all('*', handleNotFound);

module.exports = router;
