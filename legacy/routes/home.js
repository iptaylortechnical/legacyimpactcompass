var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
	res.send('get only');
});

router.get('/', function(req, res){
	res.render('advisor');
})

module.exports = router;