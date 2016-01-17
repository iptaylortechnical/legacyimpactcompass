var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

//DB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/local');

//APP
var app = express();

var testroute = require('./realtime');
app.use('/realtime', testroute);

// var io = app.get('io');
//
// io.on('connection', function(socket){
// 	console.log('connection received');
// })

lotsofclients = [];
id = 0;

app.lel = function(io){
	io.on('connection', function(socket){
		socket.yourid = id;
		id++;
		lotsofclients.push(socket);
		console.log('connection received');
		io.emit('Server 2 Client Message', 'Welcome!' );

		    socket.on('Client 2 Server Message', function(message)      {
		        console.log(message + socket.yourid);
		        io.emit('Server 2 Client Message', message.toUpperCase() );     //upcase it
		    });
	})
}

var on = function(m){
	var dataLocation = socket.location;
	var data = socket.data;
	
	var question = getLocation(dataLocation, data);
	var qid = question.qid;
	
	
}

function getLocation(q, data) {
	var parts = q.split('.');
	var newData = data[parts[0]];
	for(var i = 1; i < parts.length; i++){
		newData = newData[parts[i]];
	}
	
	return newData;
}

//expose db instance to all endpoints
//TODO: THIS IS SUBOPTIMAL. IN THE FUTURE, EXPOSE ONLY TO AUTH.JS ETC
app.use(function(req, res, next){
	req.db = db;
	next();
})


var routes = require('./routes/index');

//endpoints
var queryEnd = require('./routes/queryEnd');

//Advisor
//advisor registration
var advReg = require('./routes/advReg');
var advNew = require('./routes/advNew');
var checkAdv = require('./routes/checkAdv');
var ticketAvailable = require('./routes/ticketAvailable');
//advisor login
var advLog = require('./routes/advLog');
var authAdv = require('./routes/authadvisor');
//advisor
var advisor = require('./routes/advisor');

//User
var usrHome = require('./routes/home');
//user registration
var usrReg = require('./routes/usrReg');
var usrNew = require('./routes/usrNew');
var usernameAvailable = require('./routes/available');
var ticketInfo = require('./routes/advInfo');
//user auth
var usrLog = require('./routes/usrLog');
var auth = require('./routes/auth');
var logout = require('./routes/logout');


//TESTS
var le_test = require('./sqltests/database');
var cooktest = require('./tests/cookietest');
var test = require('./tests/test');

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
app.use('/logout', logout);
app.use('/newuser', usrNew);
app.use('/newadvisor', advNew);
app.use('/check', usernameAvailable);
app.use('/ticket', ticketInfo);
app.use('/checkadv', checkAdv);
app.use('/ticketavailable', ticketAvailable);
app.use('/authadvisor', authAdv);
app.use('/advisor', advisor);
app.use('/home', usrHome);
app.use('/q', queryEnd);

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
