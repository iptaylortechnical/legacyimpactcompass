function sendAnswer(type){
	if($('.in').val().length > 0){
		window.location = '/endpoint?a=' + $('.in').val() + '&intent=flatinput';
	}
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
})