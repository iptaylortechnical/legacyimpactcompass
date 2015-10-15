var express = require('express');
var router = express.Router();
var auth = require('../utilities/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
	
	session = req.cookies.sessionID || '';
	
	auth.isUser(session, function(good){
		if(good){
			console.log('yep');
			res.send(session);
		}else{
			res.writeHead(302, {
			  'Location': 'login'
			  //add other headers here...
			});
			res.end();
		}
	});
	
});

module.exports = router;