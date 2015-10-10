var express = require('express');
var router = express.Router();

var connectionString = 'postgres://localhost:5432';

router.get('/', function(req, res, next){
	pg.connect(connectionString, function(err, client, done) {
		// Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Insert Data
    client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM items ORDER BY id ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
        done();
        return res.json(results);
    });
	});
})

module.exports = router;