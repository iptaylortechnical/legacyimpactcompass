var express = require('express');
var router = express.Router();
var auth = require('../utilities/auth');
var userinfo = require('../utilities/userinfo');

router.post('/', function(req, res){
	res.send('get only');
});

router.get('/', function(req, res){
	
	session = req.cookies.sessionID || '';
	
	auth.isAdvisor(session, function(lel){
		//key authenticated
		if(lel){
			
			userinfo.advisor(session, function(response){
				
				console.log(response);
				
				if(!!response){
					res.render('advisor', {user:response})
				}
			})
		}else{
			auth.isUser(session, function(good){
				if(good){
					res.writeHead(302, {
					  'Location': 'home'
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
})

module.exports = router;