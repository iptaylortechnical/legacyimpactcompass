var express = require('express');
var router = express.Router();
var auth;

router.get('/', function(req, res, next){
	
	auth = require('../utilities/auth').setDB(req.db);
	
	session = req.cookies.sessionID || '';
	
	auth.isUser(session, function(good){
		if(!good){
			res.render('usrReg');
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