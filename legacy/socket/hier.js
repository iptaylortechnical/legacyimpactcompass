var answerBuilder = {
	"how-many-children": function(answer, input){
		var stuff = [
			[
				{
					"qid": "name-child-0",
					"title": "What is the name of you first child?",
					"description": "Please enter the name of you first child.",
					"answers": [
						{
							"options": "input",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				},
				{
					"qid": "name-child-1",
					"title": "What is the name of your second child?",
					"description": "Please enter the name of your second child.",
					"answers": [
						{
							"options": "input",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				}
			],
			[
				{
					"qid": "name-child-0",
					"title": "What is the name of you first child?",
					"description": "Please enter the name of you first child.",
					"answers": [
						{
							"options": "input",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				},
				{
					"qid": "name-child-1",
					"title": "What is the name of your second child?",
					"description": "Please enter the name of your second child.",
					"answers": [
						{
							"options": "input",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				},
				{
					"qid": "name-child-2",
					"title": "What is the name of your third child?",
					"description": "Please enter the name of your third child.",
					"answers": [
						{
							"options": "input",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				}
			],
			[
				{
					"qid": "name-child-0",
					"title": "What is the name of you first child?",
					"description": "Please enter the name of you first child.",
					"answers": [
						{
							"options": "input",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				},
				{
					"qid": "name-child-1",
					"title": "What is the name of your second child?",
					"description": "Please enter the name of your second child.",
					"answers": [
						{
							"options": "input",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				},
				{
					"qid": "name-child-2",
					"title": "What is the name of your third child?",
					"description": "Please enter the name of your third child.",
					"answers": [
						{
							"options": "input",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				},
				{
					"qid": "name-child-3",
					"title": "What is the name of your fourth child?",
					"description": "Please enter the name of your fourth child.",
					"answers": [
						{
							"options": "input",
							"offspring": {
								"hasChildren": false
							}
						}
					]
				}
			]
		];
		
		if(input){
			var ret = [];
			
			var proto = {
				"qid": "name-child-",
				"title": "What is the name of child ",
				"description": "Please enter the name of child ",
				"answers": [
					{
						"options": "input",
						"offspring": {
							"hasChildren": false
						}
					}
				]
			};
			
			for(var i = 0; i < answer; i++){
				proto.qid = proto.qid + i;
				proto.title = proto.title + i;
				proto.description = proto.description + i;
				
				ret.push(proto);
			}
			
			return ret;
		}else{
			return stuff[answer];
		}
	}
}



var dataNew = [
	{
		"qid": "name",
		"title": "What is your name?",
		"description": "First and last is fine.",
		"answer": [
			{
				"options": "input",
				"offspring": {
					"hasChildren": false
				}
			}
		]
	},
	{
		"qid": "how-many-children",
		"title": "How many children do you have?",
		"Please select the number of children you have, or other.",
		"answer": [
			{
				"description": "2 children",
				"answer": 2,
				"offspring": {
					"hasChildren": true,
				}
			},
			{
				"description": "3 children",
				"answer": 3,
				"offspring": {
					"hasChildren": true,
				}
			},
			{
				"description": "4 children",
				"answer": 4,
				"offspring": {
					"hasChildren": true,
				}
			},
			{
				"options": "input",
				"offspring":{
					"hasChildren": true,
				}
			}
		]
	}
]

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
		},
		{
			"description": "6 children",
			"answer": 6,
			"offspring": {
				"hasChildren": false
			}
		},
		{
			"description": "7 children",
			"answer": 7,
			"offspring": {
				"hasChildren": false
			}
		},
		{
			"description": "8 children",
			"answer": 8,
			"offspring": {
				"hasChildren": false
			}
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