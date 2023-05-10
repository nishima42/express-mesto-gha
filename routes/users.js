const users = require('express').Router();

const {
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  getMe,
} = require('../controllers/users');

const {
  userIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

users.get('/', getUsers);
users.get('/me', getMe);
users.get('/:userId', userIdValidation, getUser);
users.patch('/me', updateUserValidation, updateUser);
users.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = users;
