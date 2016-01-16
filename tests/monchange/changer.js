var sqlizer = require('./sqlizer');

sqlizer.sqlize('select "username","ticket","usable" from tickets', function(r){
	console.log(r);
});