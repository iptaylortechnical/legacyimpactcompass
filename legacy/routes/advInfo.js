var express = require('express');
var router = express.Router();
var sqlizer = require('../utilities/sqlizer');

router.get('/', function(req, res, next){
	key = req._parsedUrl.query;
	
	sqlstr = 'SELECT "imgurl", "samplename", "sampletext" FROM "public"."advisor" WHERE ("advisorid" = \'' + key + '\')';
	
	sqlizer.sqlize(sqlstr, function(data){
		res.send(data[0]);
	})
})

module.exports = router;