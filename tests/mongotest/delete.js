var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

var deleteDatData = function(db, callback){
	db.collection('restaurants').deleteOne({name:"Vella"});
	callback();
}

MongoClient.connect(url, function(err, db){
	deleteDatData(db, function(){
		db.close();
	})
})