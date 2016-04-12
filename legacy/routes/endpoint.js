var express = require('express');
var router = express.Router();
var xt = require('../utilities/next');

var authUtil;
var hier = require('../socket/hier');
var instructions = require('../utilities/instructions.js');
var session;
var intent;

router.get('/', function(req, res, next){
	
	authUtil = require('../utilities/auth').setDB(req.db);
	
	var request = req.query;
	session = req.cookies.sessionID;
	
	var answer = request.a;
	
	console.log(answer);
	
	//state object
	
	var inst = instructions({}, answer);
	inst.storeAnswer(authUtil, session, answer);
	res.render('end', inst.render);
	
	
	// get answer
	// get old location, answer from mongo
	// generate next question from previous	
	// store this answer
	// render with data
	
})

router.post('/', function(req, res){
	res.send('get only');
})

module.exports = router;