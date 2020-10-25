const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const app = express();

const { serverError, clientError } = require('./controllers/errorHandle');
const routes = require('./routes');
const DB = require('./database/dbConnection');

app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);

const middlewares = [
  compression(),
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: false }),
];
app.use(middlewares);

DB
  // eslint-disable-next-line no-console
  .on('open', () => console.log('mongo database is connected'))
  .on('error', (err) => console.log('err', err));

app.use('/api/v1/', routes);

app.get('/', (req, res) => {
  res.send('We are in home');
});

app.use(clientError);
app.use(serverError);

module.exports = app;
