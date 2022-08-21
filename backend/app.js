require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { registerValidator, authValidator } = require('./middlewares/validation');
const handleError = require('./middlewares/handleError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('Connected to mestodb');

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.post('/signup', registerValidator, createUser);
app.post('/signin', authValidator, login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Указанная страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  console.error(err);
  handleError(err, res, next);
});
