require('dotenv').config({silent: true});
var express = require('express');
var Debug = require('debug');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var lessMiddleware = require('less-middleware');
var methodOverride = require('method-override');

// Routers
var index = require('./routes/index');


//import the mongodb native drivers.
const mongodb = require('mongodb');

const localMongoURL = 'mongodb://localhost/vype';

// Init app
const app = express();
const debug = Debug('backend:app');

// Connect Mongoose
mongoose.connect(localMongoURL, { useMongoClient: true })
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Init middleware
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Setup Sessions
app.use(session({secret: 'iloveui'}));
app.use(passport.initialize());
app.use(passport.session());
// Setup local strategy
require('./config/passport')(passport);

// Flash
app.use(flash());

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;
