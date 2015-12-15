var sqlizer = require('./sqlizer');

exports.user = function(session, callback){
	sqlstr = 'SELECT username FROM "public"."users" WHERE ("sessionid" = \''+ session +'\')';
	
	sqlizer.sqlize(sqlstr, function(result){
		if(result[0]){
			callback(result[0].username);
		}else{
			callback(false);
		}
	});
	
}

exports.advisor = function(session, callback){
	sqlstr = 'SELECT username FROM "public"."advisor" WHERE ("sessionid" = \''+ session +'\')';
	
	sqlizer.sqlize(sqlstr, function(result){
		if(result[0]){
			callback(result[0].username);
		}else{
			callback(false);
		}
	});
	
}
