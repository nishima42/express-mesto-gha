const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const router = require('./routes/index');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { BAD_REQUEST } = require('./constants');
const { createUserValidation } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use('/', router);

app.use(errors());

app.use((err, req, res) => {
  if (err.name === 'CastError') {
    return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные.' });
  }
  if (err.name === 'ValidationError') {
    return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные пользователя.' });
  }
  const { statusCode = 500, message } = err;
  return res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT);
