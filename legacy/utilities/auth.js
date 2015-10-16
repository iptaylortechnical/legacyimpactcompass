var sqlizer = require('./sqlizer');
var key = require('./key');

exports.isUser = function(session, callback){
	sqlstr = 'SELECT username FROM "public"."users" WHERE ("sessionid" = \''+ session +'\')';
	
	sqlizer.sqlize(sqlstr, function(result){
		if(result[0]){
			callback(true);
		}else{
			callback(false);
		}
	});
	
}

exports.newUser = function(username, password, ticket, done){
	key.createKey(function(k){
		sqlstr = 'INSERT INTO "public"."users"("username", "password", "sessionid", "advisorid") VALUES(\'' + username + '\',\'' + password + '\',\'' + k + '\', \'' + ticket + '\')';
		
		sqlizer.sqlize(sqlstr, function(d){done();});
	})
}

exports.newAdvisor = function(username, password, ticket, done){
	key.createKey(function(k){
		sqlstr = 'INSERT INTO "public"."advisor"("username", "password", "sessionid", "advisorid") VALUES(\'' + username + '\',\'' + password + '\',\'' + k + '\',\'' + ticket + '\')';
		
		sqlizer.sqlize(sqlstr, function(d){done();});
	})
}

