var express = require('express');
var router = express.Router();
var xt = require('../utilities/next');

var authUtil;

router.get('/', function(req, res, next){
	
	// get answer
	// get old location, answer from mongo
	// generate next question from previous	
	// store this answer
	// render with data
	
	authUtil = require('../utilities/auth').setDB(req.db);
	res.send(xt.a + "");
})

router.post('/', function(req, res){
	res.send('get only');
})

function getHierarchy(sessionID, intent, done){
	if(intent == 'profile'){
		done(require('./socket/hier'));
	}
	
	if(intent == 'survey'){
		var tempHier = require('./socket/hier');
		authUtil.getSurvey(sessionID, function(e, surv){
			tempHier.setData(surv);
			done(tempHier);
		})
	}
}

function generateQuestion(content, socket, done){
	var answerDetails = [];
	for(var i = 0; i < content.answers.length; i++){
		answerDetails[i] = {
			description: content.answers[i].description,
			answer: content.answers[i].answer
		};
	}
	
	//check if the survey is done
	authUtil.surveyComplete(socket.session, content.qid, function(e, complete){
		if(!complete){
			console.log(content.type);
			socket.emit('q', JSON.stringify({
				qid: content.qid,
				title: content.title,
				type: content.type,
				description: content.description,
				answers: answerDetails
			}));
		}else{
			authUtil.setNumberOfChildren(socket.session);
			authUtil.setOnChild(socket.session);
			socket.emit('completed');
			socket.disconnect();
		}
		done();
	})
}

module.exports = router;