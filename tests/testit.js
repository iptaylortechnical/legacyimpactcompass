var data = {
	"qid": "how-many-children",
	"title": "How many children do you have?",
	"description": "Please select the number of children you have.",
	"answers": [
		{
			"description": "5 children",
			"answer": 5,
			"offspring": {
				"hasChildren": true,
				"childCount": 2
			},
			"children": [
				{
					"qid": "kind-of-tacos",
					"title": "What kind of tacos?",
					"description": "What kind of tacos do you prefer?",
					"answers": [
						{
							"description": "meat taco",
							"answer": "meat",
							"offspring": {
								"hasChildren": true,
								"childCount": 1
							},
							"children": [
								{
									"qid": "kind-of-meat",
									"title": "What kind of meat?",
									"description": "What kind of meat do you like on your sub?",
									"answers": [
										{
											"description": "ham meat",
											"answer": "ham",
											"offspring": {
												"hasChildren": false
											}
										}
									]
								}
							]
						},
						{
							"description": "veggie taco",
							"answer": "veggie",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				},
				{
					"qid": "kind-of-subs",
					"title": "What kind of subs?",
					"description": "What kind of subway sandwhiches do they like?",
					"answers": [
						{
							"description": "meatball sub sandwhich",
							"answer": "meatball",
							"offspring": {
								"hasChildren": false
							}
						},
						{
							"description": "chicken bacon ranch melt sub sandwhich",
							"answer": "cbrm",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				}
			]
		}
	]
};


function getLocation(data, q) {
	if(q){
		var parts = q.split('.');
		var newData = data[parts[0]];
		for(var i = 1; i < parts.length; i++){
			newData = newData[parts[i]];
		}
	}else{
		newData = data;
	}
	
	return newData;
}

function getParentQuestion(data, location){
	var parts = location.split('.');
	parts.pop();
	parts.pop();
	parts.pop();
	parts.pop();
	var newStr = parts.join('.');
	return {
		content: getLocation(data, newStr),
		location: newStr
	};
}

function getQuestionGroup(data, location) {
	var parts = location.split('.');
	parts.pop();
	var newStr = parts.join('.');
	return {
		content: getLocation(data, newStr),
		location: newStr
	};
}

function moreInQuestionGroup(data, location){
	var parts = location.split('.');
	return getQuestionGroup(data, location).content.length - 1 > parseInt(parts[parts.length-1]);
}

function getStartOfNextQuestionGroup(data, location){
	var groupLocation = getQuestionGroup(data, location).location + '.0';
	return groupLocation;
}

function getNextSibling(data, str) {
	var parts = str.split('.');
	var previous = parts[parts.length-1];
	
	parts.pop();
	parts.push((parseInt(previous)+1) + '');
	
	var finalLocation = parts.join('.');
	
	return {
		location: finalLocation,
		content: getLocation(data, finalLocation)
	}
}

function hasChildren(data, questionLocation, answer) {
	var obj = getLocation(data, questionLocation);
	var hasKids = obj.answers[answer].offspring.hasChildren;
	
	return hasKids;
}

function getFirstChild(data, questionLocation, answer) {
	var theQ = getLocation(data, questionLocation);
	var theA = theQ.answers[answer];
	var theChild = theA.children[0];
	
	var parts = questionLocation.split('.');
	parts.push('answers');
	parts.push(answer + '');
	parts.push('children');
	parts.push('0');
	
	if(!parts[0])parts.shift();
	
	var finalLocation = parts.join('.');
	
	return {
		location: finalLocation,
		content: theChild
	}
}

function getNextFromParent(data, location) {
	var parts = location.split('.');
	
	parts.pop();
	parts.pop();
	parts.pop();
	parts.pop();
	
	var newParts = parts.slice();
	var childID = newParts[0] ? parseInt(newParts.pop()) : 0;
	var newS = newParts.join('.');
	var groupLen = newS ? getLocation(data, newS).length : data.answers.length;
	
	if(childID < groupLen){
		parts[parts.length-1] = childID + 1;
		var finalString = parts.join('.');
		return {
			location: finalString,
			content: getLocation(data, finalString)
		}
	}else{
		var toSend = parts.join('.');
		var qLocation = getNextFromParent(data, toSend);
		
		return qLocation;
	}
}

//function getNextParentLocation(data, questionLocation) {
//	var parts = questionLocation.split('.');
//	var tempLocation = questionLocation;
//	var 
//	
//	tempLocation.pop();
//	tempLocation.pop();
//	.offspring.length;
//}


var question = '';
var answer = 0;


var socket = {};
socket.location = question;

var str = socket.location;

var qid = getLocation(data, str).qid;
//send(qid, m);


function getNextQuestion(data, questionLocation, answerID) {
	
	var nextQuestion = {};
	if(hasChildren(data, questionLocation, answer)){
		console.log("has kids");
		var q = getFirstChild(data, questionLocation, answerID);
		
		nextQuestion.location = q.location;
		nextQuestion.content = q.content;
	}else if(moreInQuestionGroup(data, questionLocation)){
		console.log('has siblings');
		var nextSibling = getNextSibling(data, questionLocation);
		nextQuestion.location = nextSibling.location;
		nextQuestion.content = nextSibling.content;
	}else{
		console.log('neither');
		var nextFromP = getNextFromParent(data, questionLocation);
		nextQuestion.content = nextFromP.content;
		nextQuestion.location = nextFromP.location;
	}
	
	return nextQuestion;
}


next = getNextQuestion(data, question, answer);


console.log(next.content.qid);
console.log(next.location);