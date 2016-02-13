var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

//APP
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

//DB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/local');
var authUtil = require('./utilities/auth').setDB(db);

var testroute = require('./socket/realtime');
app.use('/profile', testroute);
var hier = require('./socket/hier');

// var io = app.get('io');
//
// io.on('connection', function(socket){
// 	console.log('connection received');
// })

app.lel = function(io){
	io.on('connection', function(socket){
		
		//TODO: suboptimal for multiple cookies
		console.log('h'+socket.request.headers);
		var sessionID = socket.request.headers.cookie.split(' ')[1].split('=')[1];
		
		authUtil.isUser(sessionID, function(err, good){
			socket.authorized = true;
			socket.session = sessionID;
			if(good){
				authUtil.userID(sessionID, function(e, id){
					console.log(e?e:'');
					console.log('Client with id ' + id + ' has been authorized to use the socket');

					socket.id = id;
					
					authUtil.getLastState(sessionID, function(e, lastLocation, lastAnswer){
						if(e)console.log(e);
						
						if(lastLocation && lastAnswer){
							var question = hier.getNextQuestion(lastLocation, lastAnswer);
							
							socket.location = question.location;
							socket.content = question.content;
							generateQuestion(question.content, socket, function(){});
						}else{
							var question = hier.getFirstQuestion();
							socket.location = '';
							socket.content = question;
							generateQuestion(question, socket, function(){});
						}
					})

					socket.on('a', function(message) {
						
						var mes = JSON.parse(message);
						
						var answerIndex = mes.answerIndex;
						
						var ans = mes.answer;
						console.log(ans);
						
						var answer = ans;
						var oldQid = hier.getQid(socket.location);
						
						authUtil.setLastState(sessionID, socket.location, answerIndex);
						
						var question = hier.getNextQuestion(socket.location, answerIndex);
						socket.location = question.location;
						socket.content = question.content;
						
						generateQuestion(question.content, socket, function(){
							console.log('storing answer...');
							authUtil.storeAnswer(!!socket.authorized, socket.id, oldQid, answer, function(e){
								console.log("store error: " + e);
							})
						});
						
			    });
					
					//TODO: this is the worst.
					//literally.
					//currently gets parent question, not last question. im going to bed.
					socket.on('b', function(){
						var question = hier.getPrevious(socket.location);
						socket.location = question.location;
						
						generateQuestion(question.content, socket, function(){});
					})
				})
			}else{
				console.log('unathorized. terminating socket.');
				socket.disconnect();
			}
		})
	})
}

function generateQuestion(content, socket, done){
	var answerDetails = [];
	for(var i = 0; i < content.answers.length; i++){
		answerDetails[i] = {
			description: content.answers[i].description,
			answer: content.answers[i].answer
		};
	}
	//check if the survey is done
	authUtil.surveyComplete(socket.session, content.qid, function(e, complete){
		if(!complete){
			socket.emit('q', JSON.stringify({
				qid: content.qid,
				title: content.title,
				type: content.type,
				description: content.description,
				answers: answerDetails
			}));
		}else{
			authUtil.setNumberOfChildren(socket.session);
			socket.emit('completed');
			socket.disconnect();
		}
		done();
	})
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
var optionsRoute = require('./routes/options');
var setOptions = require('./routes/setoptions');
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
app.use('/options', optionsRoute);
app.use('/setoptions', setOptions);

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
