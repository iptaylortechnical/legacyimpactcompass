
    var app = require('express');
    var router = app.Router();

router.get('/', function(req, res){
	res.sendfile('test.html');
})

    module.exports= router;