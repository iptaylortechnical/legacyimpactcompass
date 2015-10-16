var express = require('express');
var router = express.Router();
var sqlizer = require('../utilities/sqlizer');

router.get('/', function(req, res, next){
	var username = req._parsedUrl.query;
	
	sqlstr = 'SELECT id FROM "public"."users" WHERE ("username" = \'' + username + '\')';
	
	sqlizer.sqlize(sqlstr, function(result){
		if(result[0]){
			res.send('0');
		}else{
			res.send('1');
		}
	})
	
})

module.exports = router;