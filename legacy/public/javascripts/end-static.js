var PRODUCTION = false;

var multi = {};
var currentSelection = 0;


function sendAnswer(){
	window.location='/endpoint?a=' + currentSelection + '&intent=static';
}

function goBack(){
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
		$(this).addClass('selected');
		currentSelection = this.id;
		$('.choice').not(this).removeClass('selected');
	})
	
	$('#0').click();
})