var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
	
	session = req.cookies.sessionID || '';
	if(session){
		console.log('yep');
		res.send(session);
	}else{
		res.send('<script>window.location="login";</script>');
	}
});

module.exports = router;