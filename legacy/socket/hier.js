var olddata = {
	"qid": "how-many-children",
	"title": "How many children do you have?",
	"description": "Please select the number of children you have.",
	"answers": [
		{
			"description": "1 child",
			"answer": 1,
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
		},
		{
			"description": "2 children",
			"answer": 2,
			"offspring": {
				"hasChildren": false
			}
		},
		{
			"description": "3 children",
			"answer": 3,
			"offspring": {
				"hasChildren": false
			}
		},
		{
			"description": "4 children",
			"answer": 4	,
			"offspring": {
				"hasChildren": false
			}
		}
	]
};


var data = {
	"test":"test",
	"qid": "continue",
	"title": "Continue",
	"type": "static",
	"description": "Would you like to continue with the survey?",
	"answers": [
		{
			"description": "Yes",
			"answer": true,
			"type": "static",
			"offspring": {
				"hasChildren":true,
				"childCount": 5
			},
			"children": [
				{
					"qid": "name",
					"title": "What is your name?",
					"type": "flatinput",
					"description": "First and Last is fine.",
					"answers": [
						{
							"description": "",
							"type": "input",
							"answer": "John Smith",
							"offspring": {
								"hasChildren":false
							}
						}
					]
				},
				{
					"qid": "birthyear",
					"title": "What is your birthyear?",
					"type": "flatinput",
					"description": "Format: XXXX",
					"answers": [
						{
							"description": "",
							"type": "input",
							"answer": "XXXX",
							"offspring": {
								"hasChildren":false
							}
						}
					]
				},
				{
					"qid": "state",
					"title": "Where do you live?",
					"type": "flatinput",
					"description": "Please enter your two-character state code.",
					"answers": [
						{
							"description": "",
							"type": "input",
							"answer": "CO",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				},
				{
					"qid": "married",
					"title": "Are you single or married?",
					"type": "static",
					"description": "Please select that which applies.",
					"answers": [
						{
							"description": "Single",
							"answer": false,
							"type": "static",
							"offspring": {
								"hasChildren": false
							}
						},
						{
							"description": "Married",
							"answer": true,
							"type": "static",
							"offspring": {
								"hasChildren": true,
								"childCount": 2
							},
							"children": [
								{
									"qid": "spouse_name",
									"title": "What is the name of your spouse?",
									"type": "flatinput",
									"description": "First and last will do.",
									"answers": [
										{
											"description": "",
											"answer": "John Smith",
											"type": "input",
											"offspring": {
												"hasChildren": false
											}
										}
									]
								},
								{
									"qid": "spouse_birthyear",
									"title": "What is the birthyear of your spouse?",
									"type": "flatinput",
									"description": "Format: XXXX",
									"answers": [
										{
											"description": "",
											"answer": "XXXX",
											"type": "input",
											"offspring": {
												"hasChildren": false
											}
										}
									]
								}
							]
						}
					]
				},
				{
					"qid": "children",
					"type": "children",
					"title": "Your Children",
					"description": "Please fill out the following information for each of your children.",
					"answers": [
						{
							"description": "not seen",
							"answer": "not seen",
							"type": "kid",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				},
				{
					"qid": "bless_other",
					"type": "multi",
					"title": "Select any others you would like to bless with your inheritance.",
					"description": "Select all that apply",
					"answers": [
						{
							"description": "Grandchildren",
							"answer": "Grandchildren",
							"type": "static",
							"offspring": {
								"hasChildren": false
							}
						},
						{
							"description": "In-Laws",
							"answer": "In-Laws",
							"type": "static",
							"offspring": {
								"hasChildren": false
							}
						},
						{
							"description": "Parents",
							"answer": "Parents",
							"type": "static",
							"offspring": {
								"hasChildren": false
							}
						},
						{
							"description": "Siblings",
							"answer": "Siblings",
							"type": "static",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				}
			]
		},
		{
			"description": "No",
			"answer": false,
			"type": "static",
			"offspring": {
				"hasChildren":false
			}
		}
	]
}


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
	console.log(answer);
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

exports.getNextQuestion = function(questionLocation, answerID) {
	
	var nextQuestion = {};
	if(hasChildren(data, questionLocation, answerID)){
		var q = getFirstChild(data, questionLocation, answerID);
		
		nextQuestion.location = q.location;
		nextQuestion.content = q.content;
	}else if(moreInQuestionGroup(data, questionLocation)){
		var nextSibling = getNextSibling(data, questionLocation);
		nextQuestion.location = nextSibling.location;
		nextQuestion.content = nextSibling.content;
	}else{
		var nextFromP = getNextFromParent(data, questionLocation);
		nextQuestion.content = nextFromP.content;
		nextQuestion.location = nextFromP.location;
	}
	
	return nextQuestion;
}

exports.getPrevious = function(qLocation){
	var theParent = getParentQuestion(data, qLocation);
	return{
		location: theParent.location,
		content: theParent.content
	}
}

exports.getFirstQuestion = function(){
	return getLocation(data, '');
}

exports.getQid = function(location){
	return getLocation(data, location).qid;
}

exports.setData = function(dat){
	data = dat;
}

exports.getData = function(){
	return data;
}