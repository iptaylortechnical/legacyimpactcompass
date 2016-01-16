var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';


var getDatData = function(db, callback) {
   var cursor = db.collections('restaurants').find( { "name": "Vella" } );
	 var rest;
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
				rest = doc;
      }else{
      	console.log(rest);
				callback();
      }
   });
	 
};

var changeGrade = function(db, data, callback){
	db.collection('restaurants').update({name: "vellas"});
	callback();
}

MongoClient.connect(url, function(err, db){
	assert.equal(null, err);
	
	getDatData(db, function(){
		db.close();
	});
})