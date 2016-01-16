var express = require('express');
var router = express.Router();
// var sqlizer = require('../utilities/sqlizer');

router.post('/', function(){
	res.send('get only');
});

router.get('/', function(req, res){
	request = req._parsedUrl.query;
	
	var db = req.db;
	var advisors = db.get('advisors');
	
	advisors.find({username:request}, 'id -_id', function(e, d){
		res.send(!!d[0] ? '0' : '1');
	})
	
	//TODO: PHASE OUT
	//POSTGRES SETUP:
	
	// sqlstr = 'SELECT "id" FROM "public"."advisor" WHERE("username" = \'' + request + '\')';
//
// 	sqlizer.sqlize(sqlstr, function(d){
// 		if(d[0]){
// 			res.send('0');
// 		}else{
// 			res.send('1');
// 		}
// 	});
});

module.exports = router;