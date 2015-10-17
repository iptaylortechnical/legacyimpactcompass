var express = require('express');
var router = express.Router();
var sqlizer = require('../utilities/sqlizer');

router.get('/', function(req, res, next){
	sqlizer.sqlize('SELECT "username","password" FROM "public"."users" WHERE ("id"  = 1)', function(k){
		res.send(k);
	});
});

module.exports = router;