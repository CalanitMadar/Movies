var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var registrationRouter = require('./routes/registration');
var loginRouter = require('./routes/login');
var menuePassRouter = require('./routes/menuePass');
var newMoviesRouter = require('./routes/newMovies');
var SearchMoviesPageRouter = require('./routes/SearchMoviesPage');
var movieDataRouter = require('./routes/movieData');
var userDataRouter = require('./routes/userData');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret:"somesecretkey",
  resave: false, // Force save of session for each request
  saveUninitialized: false, // Save a session that is new, but has not been modified
  cookie: {maxAge: 1800000 }
}));







app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', registrationRouter);
app.use('/', loginRouter);
app.use('/', menuePassRouter);
app.use('/', newMoviesRouter);
app.use('/', SearchMoviesPageRouter);
app.use('/', movieDataRouter);
app.use('/', userDataRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
