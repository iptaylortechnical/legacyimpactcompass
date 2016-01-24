var app = require('express');
var router = app.Router();
var auth = require('../utilities/auth');

router.get('/', function(req, res){
	var session = req.cookies.sessionID || '';
	
	auth.isUser(session, function(err, good){
		if(!err){
			if(good){
				res.render('realtime');
			}else{
				auth.isAdvisor(session, function(err, good){
					if(err)console.log("isAdvisor error: " + err);
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
		}else{
			console.log('error checking if session is user: ' + err);
		}
	})
	// res.sendfile('./socket/test.html');
})

router.post('/', function(){
	res.send('GET only');
})

module.exports = router;