var PRODUCTION = false;

var multi = {};

var maxChildIndex = 0;

function sendAnswer(){
	
	var toSend = [];
	
	for(var i = 0; i < maxChildIndex + 1; i++){
		//TODO: GET YEAR
		toSend.push({
			name: $('#name' + i).val(),
			year: $('#year' + i).val(),
			isMinor: (2016 - parseInt($('#year' + i).val())) < 18
		});
	}
	
	window.location = '/endpoint?a=' + JSON.stringify(toSend) + '&intent=children';
	
	console.log('sent');
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
	
	$('#add').click(function(){
		maxChildIndex++;
		
		$('#childrenholder').append("<div id='child" + maxChildIndex + "' class='achild'><label>Name: </label><input id='name" + maxChildIndex + "' class='name' label='Name:'><label>Date: </label><input id='year" + maxChildIndex + "' class='name' label='Year:'></div>");
	})
})