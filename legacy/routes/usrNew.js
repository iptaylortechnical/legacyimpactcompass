var express = require('express');
var router = express.Router();
var auth;

router.get('/', function(req, res, next){
	res.send('POST only');
});

router.post('/', function(req, res){
	auth = require('../utilities/auth').setDB(req.db);
	
	username = req.body.username;
	password = req.body.password;
	ticket = req.body.ticket;
	
	auth.newUser(username, password, ticket, function(){
		res.writeHead(302, {
		  'Location': 'login'
		  //add other headers here...
		});
		res.end();
	})
	
});

module.exports = router;