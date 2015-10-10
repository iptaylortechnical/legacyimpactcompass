var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = 'postgres://localhost:5432';

router.get('/', function(req, res, next){
	var results = [];

	    // Grab data from http request
	pg.connect(connectionString, function(err, client, done) {
//     // SQL Query > Insert Data
     client.query("INSERT INTO items(text, complete) values('there', '0')");
		 
//     // SQL Query > Select Data
     var query = client.query("SELECT * FROM items ORDER BY id ASC");
//
//     // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });
//
//     // After all data is returned, close connection and return results
    query.on('end', function() {
        done();
        return res.json(results);
    });
	});
});

module.exports = router;