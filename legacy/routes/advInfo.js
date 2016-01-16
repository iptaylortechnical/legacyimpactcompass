var express = require('express');
var router = express.Router();
// var sqlizer = require('../utilities/sqlizer');

router.get('/', function(req, res, next){
	key = req._parsedUrl.query;
	
	var db = req.db;
	var advisors = db.get('advisors');
	
	var data = advisors.find({advisorid:key}, '-_id imgurl samplename sampletext', function(e, d){
		res.send(d[0]);
	});
	
	//TODO: PHASE OUT
	//POSTGRES SETUP:
	
	// sqlstr = 'SELECT "imgurl", "samplename", "sampletext" FROM "public"."advisor" WHERE ("advisorid" = \'' + key + '\')';
//
// 	sqlizer.sqlize(sqlstr, function(data){
// 		res.send(data[0]);
// 	})
})

module.exports = router;