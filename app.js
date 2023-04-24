const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64452bc68e34ef7f2d98ac43',
  };

  next();
});

app.use('/', users);
app.use('/', cards);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
