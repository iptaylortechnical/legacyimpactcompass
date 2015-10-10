var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.send('<script>window.location="http://www.google.com";</script>');
});

module.exports = router;