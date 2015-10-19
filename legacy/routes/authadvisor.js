var express = require('express');
var router = express.Router();
var pg = require('pg');
var sqlizer = require('../utilities/sqlizer');

router.post('/', function(req, res){
	username = req.body.username;
	password = req.body.password;
	
	results = [];
	
	pw_sqlstr = 'SELECT password FROM advisor WHERE("username" = \''+ username +'\')';
	sI_sqlstr = 'SELECT sessionID FROM advisor WHERE("username" = \'' + username + '\')';
	
	sqlizer.sqlize(pw_sqlstr, function(results){
		console.log(results);
		pw = results[0].password;
		
    sqlizer.sqlize(sI_sqlstr, function(results){
    	sI = results[0].sessionid;
			
	    if(password == pw){
				res.cookie('sessionID', sI);
				res.writeHead(302, {
				  'Location': '/'
				  //add other headers here...
				});
				res.end();
	    }else{
	    	res.send('incorrect');
	    }
    })
	});
	
});

router.get('/', function(req, res, next){
	res.render('usrLog');
});

module.exports = router;