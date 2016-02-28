var sqlizer = require('./sqlizer');
var key = require('./key');
var monk = require('monk');

var db;

exports.setDB = function(indb){
	db = indb;
	return exports;
}

var findUser = function(sessionID, callback){
	var users = db.get('users');
	users.find({'sessionid': sessionID}, function(e, docs){
		callback(e, docs);
	});
}

var updateUser = function(sessionID, obj){
	var users = db.get('users');
	var toSet = obj;
	
	users.update({"sessionid": sessionID}, {$set:toSet});
}

//TODO: use native funs
exports.storeAnswer = function(authorized, id, qid, answer, callback){
	if(authorized){
		var users = db.get('users');
		
		var toSet = {};
		
		toSet['answers.'+qid] = answer;
		
		users.update(id, {$set:toSet});
	}else{
		callback('client not authorized');
	}
}

exports.userID = function(session, callback){
	if(db){
		var users = db.get('users');
		
		users.find({"sessionid": session}, function(e, docs){
			callback(e, docs[0]._id);
		})
	}else{
		callback('please register db');
	}
}

exports.isUser = function(session, callback){
	
	if(db){
		var users = db.get('users');
	
		users.find({"sessionid": session}, function(e, docs) {
			var isGood;
			
			if(!!docs[0]){
				isGood = true;
			}else{
				isGood = false;
			}
			callback(null, isGood);
		})
	}else{
		callback("please register db", false);
	}
	
	//TODO: PHASE OUT
	//POSTGRES SETUP:
	
	// sqlstr = 'SELECT username FROM "public"."users" WHERE ("sessionid" = \''+ session +'\')';
//
// 	sqlizer.sqlize(sqlstr, function(result){
// 		if(result[0]){
// 			callback(true);
// 		}else{
// 			callback(false);
// 		}
// 	});
	
}

exports.isAdvisor = function(session, callback){
	
	if(db){
		var advisors = db.get('advisors');
		
		advisors.find({"sessionid": session}, 'username', function(e, docs){
			console.log(docs);
			var isGood;
			
			if(!!docs[0]){
				isGood = true;
			}else{
				isGood = false
			}
			
			callback(null, isGood);
		})
	}else{
		callback("please register db", false);
	}
	
	//TODO: PHASE OUT
	//POSTGRES SETUP:
	
	// sqlstr = 'SELECT username FROM "public"."advisor" WHERE ("sessionid" = \''+ session +'\')';
//
// 	sqlizer.sqlize(sqlstr, function(result){
// 		if(result[0]){
// 			callback(true);
// 		}else{
// 			callback(false);
// 		}
// 	});
	
}

exports.newUser = function(username, password, ticket, done){
	
	if(db){
		//TODO: CHANGE CREATEKEY TO POSTGRES
		key.createKey(function(k){
			var users = db.get('users');
			
			users.insert({
				username: username, 
				password: password,
				sessionid: k,
				advisorid:ticket,
				state: {
					profile: 'next',
					options: 'undone',
					survey: 'undone',
					fears: 'undone'
				},
				answers: {},
				survey: {},
				lastState: {},
				onChild: {}
			});
			
			done(null);
		})
	}else{
		done("please register db");
	}
	
	//TODO: PHASE OUT
	//POSTGRES SETUP:
	
	// key.createKey(function(k){
// 		sqlstr = 'INSERT INTO "public"."users"("username", "password", "sessionid", "advisorid") VALUES(\'' + username + '\',\'' + password + '\',\'' + k + '\', \'' + ticket + '\')';
//
// 		sqlizer.sqlize(sqlstr, function(d){done();});
// 	})
}

exports.newAdvisor = function(username, password, ticket, imgurl, samplename, sampletext, done){
	
	if(db){
		var advisors = db.get('advisors');
		var tickets = db.get('tickets');
		
		tickets.update(
			{ ticket:ticket },
			{
				$set: {
					username: username,
					usable: false
				}
			}
		);
		
		key.createKey(function(k){
			advisors.insert({
				username:username,
				password:password,
				sessionid:k,
				advisorid:ticket,
				imgurl:imgurl,
				samplename:samplename,
				sampletext:sampletext
			})
		});
		
		done(null);
		
	}else{
		done("please register db");
	}
	
	//TODO: PHASE OUT
	//POSTGRES SETUP:
	
	// sqlstr = 'UPDATE "public"."tickets" SET "username" = \'' + username + '\' WHERE("ticket" = \'' + ticket + '\')';
//
// 	sqlizer.sqlize(sqlstr, function(d){
// 		sqlstr = 'UPDATE "public"."tickets" SET "usable" = \'FALSE\' WHERE("ticket" = \'' + ticket + '\')';
//
// 		sqlizer.sqlize(sqlstr, function(d){
// 			key.createKey(function(k){
//
// 				sqlstr = 'INSERT INTO "public"."advisor"("username", "password", "sessionid", "advisorid", "imgurl", "samplename", "sampletext") VALUES(\'' + username + '\',\'' + password + '\',\'' + k + '\',\'' + ticket + '\', \'' + imgurl + '\', \'' + samplename + '\', \'' + sampletext + '\')';
//
// 				//console.log(sqlstr);
//
// 				sqlizer.sqlize(sqlstr, function(d){done();});
// 			})
// 		});
// 	});
	
}


//TODO: suboptimal. dont get whole doc, just get what you need
exports.getCompletion = function(sessionID, done){
	if(db){
		findUser(sessionID, function(e, docs){
			var state = docs[0].state;
			done(e, {
				profile: state.profile,
				options: state.options,
				survey: state.survey,
				fears: state.fears
			})
		})
	}else{
		done("please register db");
	}
}

//TODO: suboptimal. dont get whole doc, just get what you need
//actually this whole thing is hella suboptimal
exports.surveyComplete = function(session, qid, done){
	if(db){
		findUser(session, function(e, docs){
			var q = Object.keys(docs[0].answers)[0];
			console.log(q);
			if(q == qid){
				console.log('end of the thing');
				var obj = {
					state: {
						profile: 'completed',
						options: 'next',
						survey: 'undone',
						fears: 'undone'
					}
				};
				updateUser(session, obj);
				done(e, true);
			}else{
				done(e, false);
			}
			
		})
	}else{
		done('please register db');
	}
}


// ????? THIS IS HORRIBLE. WHAT WERE I THINKING? STAHP.
exports.setNumberOfChildren = function(session){
	// if(db){
// 		findUser(session, function(e, user){
// 			if(!e){
// 				var answer = user[0].answers['how-many-children'].answer;
// 				updateUser(session, {
// 					numOfChildren: answer
// 				})
// 			}else{
// 				console.log('ERROR IN AUTH - setNumberOfChildren: ' + e);
// 			}
// 		})
// 	}else{
// 		console.log('ERROR IN AUTH - setNumberOfChildren: YOU HAVE NOT REGISTERED DB');
// 	}
}


// NOOPPPEEE
exports.getChildren = function(session, done){
	if(db){
		findUser(session, function(e, user){
			if(!e){
				done(null, user[0].answers.children);
			}else{
				done(e);
			}
		})
	}else{
		done('please register db');
	}
}

exports.getQuestionSets = function(done){
	if(db){
		var presets = db.get('presets');
		
		presets.find({purpose: "questionsets"}, function(e, docs){
			if(!e){
				done(null, docs[0].content)
			}else{
				done(e);
			}
		})
	}else{
		done('getQuestionSets: REGISTER DB');
	}
}

exports.storeSurvey = function(session, survey){
	if(db){
		updateUser(session, {survey:survey});
		updateUser(session, {state:{
			profile:"completed",
			options:"completed",
			survey:"next",
			fears:"undone"
		}})
	}else{
		console.log('storeSurvey: REGISTER DB');
		return 'storeSurvey: REGISTER DB';
	}
}

exports.getLastState = function(session, done){
	if(db){
		findUser(session, function(e, docs){
			var state = docs[0].lastState || {};
			
			var location = state.location || null;
			var answer = state.answer || null;
			
			done(null, location, answer);
		})
	}else{
		done('please register db');
	}
}

exports.setLastState = function(session, location, answer){
	if(db){
		updateUser(session, {
			"lastState.location":location,
			"lastState.answer":answer
		})
	}else{
		console.log('setLastState: REGISTER DB');
		return 'setLastState: REGISTER DB';
	}
}

exports.getSurvey = function(session, done){
	if(db){
		findUser(session, function(e, docs){
			var survey = docs[0].survey;
			
			done(e, survey);
		})
	}else{
		done('getSurvey: REGISTER DB');
	}
}

exports.setOnChild = function(session){
	if(db){
		findUser(session, function(e, docs){
			var children = docs[0].answers.children;
			
			var onChild = {};
			
			for(var i = 0; i < children.length; i++){
				onChild[children[i].name.split(' ')[0]] = 'undone';
			}
			
			onChild[Object.keys(onChild)[0]] = 'next';
			
			updateUser(session, {
				onChild: onChild
			})
		})
	}
}

exports.getOnChild = function(session, done){
	if(db){
		findUser(session, function(e, docs){
			var onChild = docs[0].onChild;
			
			done(e, onChild);
		})
	}else{
		done('getOnChild: REGISTER DB')
	}
}