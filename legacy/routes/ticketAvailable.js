var express = require('express');
var router = express.Router();
// var sqlizer = require('../utilities/sqlizer');

router.post('/', function(req, res){
	res.send('get only');
});

router.get('/', function(req, res, next){
	var request = req._parsedUrl.query;
	
	var db = req.db;
	var tickets = db.get('tickets');
	
	tickets.find({ticket:request}, 'username', function(e, d){
		res.send(!!d[0] ? '0' : '1');
	})
	
	//TODO: PHASE OUT
	//POSTGRES SETUP:
	
	// sqlstr = 'SELECT "username" FROM "public"."tickets" WHERE("ticket" = \'' + request +'\')';
//
// 	sqlizer.sqlize(sqlstr, function(d){
//
// 		r = d[0] || {username:""};
//
// 		if(r.username == null){
// 			//available
// 			res.send('1');
// 		}else{
// 			//not available
// 			res.send('0');
// 		}
// 	});
});

module.exports = router;