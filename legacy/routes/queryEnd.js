var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
	res.send('get only');
});

router.get('/', function(req, res){
	
	var parts = ['first', 'second', 'third', 'fourth'];

	progress = {
		val1: "",
		val2: "",
		val3: "",
		val4: "",
		part: 0
	};

	progressB = [
		"val1",
		"val2",
		"val3",
		"val4"
	];
	
	q = req._parsedUrl.query;
	
	if(q){
		partite = q.split('=');
		
		if(partite[0] == 'p'){
			part = parseInt(partite[1]);
			
			progress.part = part;
			
			for(var i = 0; i < part; i++){
				progress[progressB[i]] = "completed";
			}
			
			res.render('question', progress);
		}else{
			res.send('invalid');
		}
	}else{
		res.send('invalid');
	}
})

module.exports = router;