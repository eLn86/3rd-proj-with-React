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

const passportSocketIo = require('passport.socketio');
const MongoStore = require('connect-mongo')(session);

/**
 * Load environment variables from .env file.
 */
const dotenv = require('dotenv');
dotenv.load({ path: '.env' });

//import the mongodb native drivers.
const mongodb = require('mongodb');

/**
 *  Create Express, Socket.io server.
 */
const app = express();
const debug = Debug('backend:app');

const server = require('http').Server(app);
const io = require('socket.io')(server);

/**
 *  Mongoose Connection.
 */
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, { useMongoClient: true })
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// view engine setup
app.set('port', process.env.PORT || 3001);
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

/**
 * Session configuration.
 */
 const sessionStore = new MongoStore({
   url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
   autoReconnect: true,
   clear_interval: 3600
 });

/**
 * User Session
 */
app.use(session({
  key: 'connect.sid',
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  cookieParser: cookieParser
}));

/**
 * Connect to passportSocketIO
 */
io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: 'connect.sid',
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  passport: passport,
  success: onAuthorizeSuccess,
  fail: onAuthorizeFail
}));

/**
 * Function: onAuthorizeFail
 * Purpose: if authorization fails, console log error message
 * Used in: io.use(passportSocketIo.authorize()) function
 */
function onAuthorizeFail(d, m, e, accept) {
  console.log('Connection Failed to socket.io ', e, m);
  accept(null, false);
}

/**
 * Function: onAuthorizeSuccess
 * Purpose: if authorization succeeds, console log success message
 * Used in: io.use(passportSocketIo.authorize()) function
 */
function onAuthorizeSuccess(d, accept) {
  console.log('Successful connection to socket.io');
  accept(null, true);
}

// Initialize passport and session for passport logins
app.use(passport.initialize());
app.use(passport.session());

// Setup local strategy
require('./config/passport')(passport);

// Flash
app.use(flash());


/**
 * Routers.
 */
var index = require('./routes/index');
app.use('/', index);

// import socket IO route
const socketIO = require('./routes/websockets')(io);


/**
 * Error Handlers.
 */

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


/**
 * Start Express server.
 */
server.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d'); 
});

export default app;
