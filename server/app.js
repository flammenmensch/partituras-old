const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const compression = require('compression');

const partituras = require('./routes/partituras');

const app = express();

app.enable('strict routing');
app.use(helmet());
app.use(compression());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, '../client/build/static')));
app.use('/', express.static(path.join(__dirname, '../client/build')));
app.use('/api/partituras', partituras);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

/*
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
);
*/

module.exports = app;
