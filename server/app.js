var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var mongoose = require('mongoose');
var { Result } = require('./model')

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// Database
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/se-faq', process.env.MONGO_URL ? {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD,
}: {});

app.listen(require('./config.json').SERVER_PORT, function () {
  console.info('LISTENING ON PORT ' + require('./config.json').SERVER_PORT + '.');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json(Result.error('', '404 Not found.'));
  // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(Result.error('', err));
  // res.render('error');
});

module.exports = app;
