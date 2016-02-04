var express = require('express');
var router = express.Router();
var auth;
var qsets = require('../utilities/qsets');

router.post('/', function(req, res){
	res.send('GET only');
});

router.get('/', function(req, res, next){
	
	auth = require('../utilities/auth').setDB(req.db);
	
	session = req.cookies.sessionID || '';
	
	auth.isUser(session, function(err, good){
		if(err)console.log("isUser error: " + err);
		if(good){
			
			auth.getCompletion(session, function(e, docs){
				
				if(docs.options == 'next'){
				
					var data = req.query.ids.split(',');
					console.log(data);
					var survey = [];
					var surveySections = [];
	
					auth.getNumberOfChildren(session, function(e, num){
						for(var i = 0; i < data.length; i++){
							surveySections.push(qsets[data[i]]('ron'));
						}
						
						var surveySectionsJoined = collect(surveySections);
				
						for(var i = 0; i < num; i++){
							survey.push(surveySectionsJoined);
						}
				
						console.log(surveySectionsJoined);
				
						auth.storeSurvey(session, survey);
					})
				}
			})
		}
	});
	
	res.writeHead(302, {
	  'Location': '/'
	  //add other headers here...
	});
	res.end();
	
});

collect = function(ar) {
  var ret = {};
  var len = ar.length;
  for (var i=0; i<len; i++) {
    for (p in ar[i]) {
      if (ar[i].hasOwnProperty(p)) {
        ret[p] = ar[i][p];
      }
    }
  }
  return ret;
}

module.exports = router;