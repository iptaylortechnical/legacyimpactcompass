var express = require('express');
var router = express.Router();
var auth = require('../utilities/auth');

router.post('/', function(req, res){
	res.send('get only');
});

router.get('/', function(req, res){
	
	session = req.cookies.sessionID || '';
	
	auth.isAdvisor(session, function(lel){
		//key authenticated
		if(lel){
			res.render('advisor');
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