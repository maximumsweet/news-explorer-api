require('dotenv').config({ path: './.env' });
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const routes = require('./routes');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mongoUrl } = require('./configs/devConfig');
const limiter = require('./modules/limiter');

const app = express();

app.use(helmet());
app.use(limiter);

const { PORT = 3000, NODE_ENV, DATABASE_LINK } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DATABASE_LINK : mongoUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorMiddleware);

app.listen(PORT);
