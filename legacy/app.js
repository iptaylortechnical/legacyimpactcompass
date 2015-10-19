var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

//Advisor
//advisor registration
var advReg = require('./routes/advReg');
var advNew = require('./routes/advNew');
var checkAdv = require('./routes/checkAdv');
//advisor login
var advLog = require('./routes/advLog');

//User
//user registration
var usrReg = require('./routes/usrReg');
var usrNew = require('./routes/usrNew');
var usernameAvailable = require('./routes/available');
var ticketInfo = require('./routes/advInfo');
//user auth
var usrLog = require('./routes/usrLog');
var auth = require('./routes/auth');


//TESTS
var le_test = require('./sqltests/database');
var cooktest = require('./tests/cookietest');
var test = require('./tests/test');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/registeradvisor', advReg);
app.use('/register', usrReg);
app.use('/login', usrLog);
app.use('/advisorlogin', advLog);
app.use('/auth', auth);
app.use('/newuser', usrNew);
app.use('/newadvisor', advNew);
app.use('/check', usernameAvailable);
app.use('/ticket', ticketInfo);
app.use('/checkadv', checkAdv);

app.use('/sqltest', le_test);
app.use('/cooktest', cooktest);
app.use('/test', test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // res.render('error', {
//       message: err.message,
//       error: err
//     });
res.send(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
	res.send(err.message);
});


module.exports = app;
