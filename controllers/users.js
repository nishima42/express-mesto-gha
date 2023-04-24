const User = require('../models/user');

const {
  badRequestCode,
  notFoundCode,
  serverError,
} = require('../constants');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(badRequestCode).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      return res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(notFoundCode).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(badRequestCode).send({ message: 'Переданы некорректные данные пользователя.' });
      }
      return res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(serverError).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(notFoundCode).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(badRequestCode).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      return res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(notFoundCode).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(badRequestCode).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      return res.status(serverError).send({ message: 'На сервере произошла ошибка' });
    });
};
