// var sqlizer = require('./sqlizer');

exports.user = function(session, db, callback){
	if(db){
		var users = db.get('users');
		
		users.find({sessionid: session}, 'username', function(e, d){
			if(!!d[0]){
				callback(d[0].username);
			}else{
				callback(false);
			}
		})
	}else{
		callback(false);
	}
	
	
	//TODO: PHASE OUT
	//POSTGRES SETUP:
	
	// sqlstr = 'SELECT username FROM "public"."users" WHERE ("sessionid" = \''+ session +'\')';
//
// 	sqlizer.sqlize(sqlstr, function(result){
// 		if(result[0]){
// 			callback(result[0].username);
// 		}else{
// 			callback(false);
// 		}
// 	});
	
}

exports.advisor = function(session, db, callback){
	
	if(db){
		var advisors = db.get('advisors');
		
		advisors.find({sessionid: session}, 'username', function(e, d){
			if(!!d[0]){
				callback(d[0].username);
			}else{
				callback(false);
			}
		})
	}
	
	//TODO: PHASE OUT
	//POSTGRES SETUP:
	
	// sqlstr = 'SELECT username FROM "public"."advisor" WHERE ("sessionid" = \''+ session +'\')';
//
// 	sqlizer.sqlize(sqlstr, function(result){
// 		if(result[0]){
// 			callback(result[0].username);
// 		}else{
// 			callback(false);
// 		}
// 	});
	
}
