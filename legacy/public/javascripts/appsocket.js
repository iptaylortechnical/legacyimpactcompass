var PRODUCTION = true;


var socket = io(PRODUCTION ? ':80' : ':3000');
var active = {};

var currentSelection;

socket.on('q', function(message){
	active = JSON.parse(message);
	
	createCurrentQuestion();
});

socket.on('disconnect', function(){console.log('been kicked lol');});

socket.on('completed', function(){
	window.location = '/';
})

function createCurrentQuestion(){
	document.getElementById('qtitle').innerHTML = active.title;
	
	var theHTML = '';
		// var theHTML = '';
	var answers = active.answers;

	for(var i = 0; i < answers.length; i++){
		theHTML += '<a id="' + i + '" class="tile tile-lg tile-sqr tile-grey ripple-effect animated"  0.41s;"><span class="content-wrapper"><span class="tile-content"><span class="tile-img"  url(http://www.google.com/design/images/design-minutes.png);"></span><span class="tile-holder tile-holder-sm"><span class="title">' + answers[i].description + '</span></span></span></span><span class="ink animate"  270px; width: 270px; top: 104px; left: -44px;"></span></a>';
	}
	
	document.getElementById('answers').innerHTML = theHTML;
	
	jQuery('.tile').click(function(){
		$('#description').html(active.answers[this.id].description);
		$(this).addClass('selected');
		currentSelection = this.id;
			$('.tile').not(this).removeClass('selected');
	})
	
	$('#0').click();
}

function sendAnswer(){
	socket.emit('a', JSON.stringify({"answer":currentSelection}));
	console.log('sent');
}

function goBack(){
	socket.emit('b');
	console.log('sent');
}

// function clearCSS(){
// 	var answerObjects = $('.choice');
//
// 	for(var i = 0; i < answerObjects.length; i++){
// 		if(!(i == currentSelection)){
// 			$(answerObjects[i]).attr('class', 'title choice');
// 		}
// 	}
// }

$(document).ready(function(){
	$('#next').click(function(){
		sendAnswer();
	})
	
	$('#back').click(function(){
		goBack();
	})
})