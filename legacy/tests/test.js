var express = require('express');
var router = express.Router();
var sqlizer = require('../utilities/sqlizer');

router.get('/', function(req, res, next){
	sqlizer.sqlize('SELECT "username" FROM "public"."tickets" WHERE ("ticket"  = \'RASHLY\')', function(k){
		res.send(k);
	});
});

module.exports = router;