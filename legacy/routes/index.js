var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
	session = req.cookies.sessionID || '';
	if(session){
		res.send(session);
	}else{
		res.send('nope');
	}
});

module.exports = router;
