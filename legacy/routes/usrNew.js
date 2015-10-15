var express = require('express');
var router = express.Router();
var auth = require('../utilities/auth');

router.get('/', function(req, res, next){
	res.send('POST only');
});

router.post('/', function(req, res){
	username = req.body.username;
	password = req.body.password;
	
	auth.newUser(username, password, function(){
		res.writeHead(302, {
		  'Location': 'login'
		  //add other headers here...
		});
		res.end();
	})
	
});

module.exports = router;