var express = require('express');
var router = express.Router();
var pg = require('pg');

router.post('/', function(req, res){
	username = req.body.username;
	password = req.body.password;
	
	results = [];
	
	sqlstr = 'SELECT password FROM users WHERE("username" = \''+ username +'\')';
	
	pg.connect('postgres://localhost:5432', function(err, client, done){
		var query = client.query(sqlstr);
		
    query.on('row', function(row) {
        results.push(row);
    });
//
//     // After all data is returned, close connection and return results
    query.on('end', function() {
        done();
        if(password == results[0].password){
					res.cookie('sessionID', password);
        	res.send('authenticated <script>setTimeout(function(){window.location="/";}, 3000);</script>');
        }else{
        	res.send('incorrect');
        }
    });
		
	});
	
});

router.get('/', function(req, res, next){
	res.render('usrLog');
});

module.exports = router;