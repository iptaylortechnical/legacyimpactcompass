var express = require('express');
var router = express.Router();
var auth;

/* GET home page. */
router.get('/', function(req, res, next) {
	
	auth = require('../utilities/auth').setDB(req.db);
	
  //res.render('index', { title: 'Express' });
	
	session = req.cookies.sessionID || '';
	
	if(session){
		auth.isUser(session, function(err, good){
			if(err)console.log("isUser error: " + err);
			if(good){
				console.log('yep');
				res.writeHead(302, {
				  'Location': 'home'
				  //add other headers here...
				});
				res.end();
			}else{
				auth.isAdvisor(session, function(err, good){
					console.log('got here');
					if(err)console.log("isAdv error: " + err);
					if(good){
						res.writeHead(302, {
						  'Location': 'advisor'
						  //add other headers here...
						});
						res.end();
					}else{
						res.writeHead(302, {
						  'Location': 'login'
						  //add other headers here...
						});
						res.end();
					}
				});
			}
		});
	}else{
		res.writeHead(302, {
		  'Location': 'login'
		  //add other headers here...
		});
		res.end();
	}
	
});

module.exports = router;