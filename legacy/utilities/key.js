var pg = require('pg');

exports.createKey = function(callback){
	
	pg.connect('postgres://localhost:5432', function(err, client, done){
		callback('hi');
	});
	
}