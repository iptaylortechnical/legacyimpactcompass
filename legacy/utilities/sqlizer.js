var pg = require('pg');

exports.sqlize = function(str, callback){
	pg.connect('postgres://localhost:5432', function(err, client, done){
		query = client.query(str);
		results = [];
		query.on('row', function(row){
			results.push(row);
		});
		
		query.on('end', function(){
			done();
			callback(results);
		})
	});
}