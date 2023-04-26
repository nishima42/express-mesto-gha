const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');
const { handleNotFound } = require('../controllers/errors');

router.use('/users', users);
router.use('/cards', cards);
router.all('*', handleNotFound);

module.exports = router;
