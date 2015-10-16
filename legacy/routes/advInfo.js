var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	key = req._parsedUrl.query;
})

module.exports = router;