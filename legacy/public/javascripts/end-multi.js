var PRODUCTION = false;

var multi = {};
var currentSelection;

var maxChildIndex;
		
jQuery('.tile').click(function(){
	if(!multi[this.id]){
		$(this).addClass('selected');
		multi[this.id] = active.answers[this.id];
	}else{
		$(this).removeClass('selected');
		delete multi[this.id];
	}
})

$('#0').click();

function sendAnswer(type){
	
}

function goBack(){
	socket.emit('b');
	console.log('sent');
}

$(document).ready(function(){
	$('#next').click(function(){
		sendAnswer(active.type);
	})
	
	$('#back').click(function(){
		goBack();
	})
})