var PRODUCTION = false;

var multi = [];

function sendAnswer(){
	window.location = '/endpoint?a=' + JSON.stringify(Object.keys(multi)) + '&intent=multi';
}

function goBack(){
	socket.emit('b');
	console.log('sent');
}

$(document).ready(function(){
	$('#next').click(function(){
		sendAnswer();
	})
	
	$('#back').click(function(){
		goBack();
	})
	
	jQuery('.choice').click(function(){
		if(!multi[parseInt(this.id)]){
			$(this).addClass('selected');
			multi[parseInt(this.id)] = parseInt(this.id);
		}else{
			$(this).removeClass('selected');
			delete multi[parseInt(this.id)];
		}
	})

	$('#0').click();
})