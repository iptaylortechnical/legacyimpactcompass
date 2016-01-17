var app = require('express')();


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
	
	var http = require('http').Server(req.app);
	var io = require('socket.io')(http);
	
	io.on('connection', function(socket){
	  console.log('a user connected');
	
		socket.on('disconnect', function(){
			console.log('a user disconnected');
		})
	
		socket.on('dat', function(msg){
			console.log(msg);
		})
	});

	io.on('dat', function(msg){
		console.log(msg);
	})

	http.listen(3000, function(){
	  console.log('listening on *:3000');
	});
	
});

module.exports = app;