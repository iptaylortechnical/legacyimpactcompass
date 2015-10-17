var express = require('express');
var router = express.Router();
var auth = require('../utilities/auth');

router.get('/', function(req, res, next){
	session = req.cookies.sessionID || '';
	
	auth.isUser(session, function(good){
		if(!good){
			res.render('main');
		}else{
			res.writeHead(302, {
			  'Location': '/'
			  //add other headers here...
			});
			res.end();
		}
	});
})

module.exports = router;