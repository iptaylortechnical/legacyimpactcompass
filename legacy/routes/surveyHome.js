var express = require('express');
var router = express.Router();
var userinfo = require('../utilities/userinfo');
var auth;

router.post('/', function(req, res){
	res.send('get only');
});
console.log('kd');
router.get('/', function(req, res){
	auth = require('../utilities/auth').setDB(req.db);
	session = req.cookies.sessionID || '';
	
	auth.isUser(session, function(err, good){
		if(err)console.log("isUser error: " + err);
		console.log('good' + good);
		if(good){
			
			auth.getCompletion(session, function(err, state){
				console.log(state);
				if(state.survey == 'next'){
					userinfo.user(session, req.db, function(u){
						console.log(u);
						auth.getOnChild(session, function(err, things){
							res.render('surveyHome', {
								user: u,
								things: things
							});
						})
					})
				}else{
					res.writeHead(302, {
					  'Location': '/'
					  //add other headers here...
					});
					res.end();
				}
			})
			
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
	});
})

module.exports = router;