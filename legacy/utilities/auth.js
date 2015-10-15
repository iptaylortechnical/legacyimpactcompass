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

exports.newUser = function(username, password, done){
	key.createKey(function(k){
		sqlstr = 'INSERT INTO "public"."users"("username", "password", "sessionid") VALUES(\'' + username + '\',\'' + password + '\',\'' + k + '\')';
		
		sqlizer.sqlize(sqlstr, function(d){done();});
	})
}