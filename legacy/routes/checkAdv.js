var express = require('express');
var router = express.Router();
var sqlizer = require('../utilities/sqlizer');

router.post('/', function(){
	res.send('get only');
});

router.get('/', function(req, res){
	request = req._parsedUrl.query;
	
	sqlstr = 'SELECT "id" FROM "public"."advisor" WHERE("username" = \'' + request + '\')';
	
	sqlizer.sqlize(sqlstr, function(d){
		if(d[0]){
			res.send('0');
		}else{
			res.send('1');
		}
	});
});

module.exports = router;