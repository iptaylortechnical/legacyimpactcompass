var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
	res.send('GET only');
	
});

router.get('/', function(req, res, next){
	res.cookie('sessionID', '');
	
	res.writeHead(302, {
	  'Location': 'home'
	  //add other headers here...
	});
	res.end();
});

module.exports = router;