var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.render('advReg_temp');
});

module.exports = router;