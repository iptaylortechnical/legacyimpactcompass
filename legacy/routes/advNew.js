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
	imgurl = req.body.imgurl;
	samplename = req.body.samplename;
	sampletext = req.body.sampletext;
	
	//TODO: FIX "'" CHARACTER ESCAPING
	
	auth.newAdvisor(username, password, ticket, imgurl, samplename, sampletext, function(){
		res.writeHead(302, {
		  'Location': 'advisorlogin'
		  //add other headers here...
		});
		res.end();
	})
	
});

module.exports = router;