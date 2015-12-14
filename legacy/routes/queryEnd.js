var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
	res.send('get only');
});

var qBank = [
	'How many children do you have?',
	'What is the number of blahs?',
	'What kind of icecream do you like?',
	'What is your favorite color?'
];

var aBank = [
	[
		'one',
		'two',
		'three'
	],
	
	[
		'six',
		'two',
		'four'
	],
	
	[
		'mint',
		'caramel',
		'pb'
	],
	
	[
		'red',
		'blue',
		'green'
	]
];

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
			
			progress.prompt = qBank[part-1];
			progress.first = aBank[part-1][0];
			progress.second = aBank[part-1][1];
			progress.third = aBank[part-1][2];
			
			res.render('question', progress);
		}else{
			res.send('invalid');
		}
	}else{
		res.send('invalid');
	}
})

module.exports = router;