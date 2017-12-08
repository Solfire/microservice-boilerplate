const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('./util/logger');

const helloWorld = require('./middleware/helloWorld');
const coletta = require('./middleware/coletta');

const apiController = require('./controllers/api');

const app = express();

app.use('/', morgan('tiny', {
  stream: {
    write: (message) => {
      logger.info(message);
    }
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// routes
app.get('/health', apiController.health);
app.get('/v1', apiController.health);
app.get('/', [
  helloWorld,
  apiController.root
]);
app.post('/v1', [
  coletta,
  apiController.clean
]);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json({
    error: 'not found'
  });
});

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;

  logger.error(err);

  res.status(status);
  res.json({
    status,
    error: err.message,
  });
});

module.exports = app;
