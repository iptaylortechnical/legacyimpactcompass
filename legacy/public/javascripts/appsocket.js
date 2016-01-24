var socket = io(':3000');
var active = {};

var currentSelection;

socket.on('q', function(message){
	active = JSON.parse(message);
	
	createCurrentQuestion();
});

socket.on('disconnect', function(){console.log('been kicked lol');});

function createCurrentQuestion(){
	document.getElementById('qtitle').innerHTML = active.title;
	
	var theHTML = '';
	var answers = active.answers;
	
	for(var i = 0; i < answers.length; i++){
		theHTML += "<div id='" + i + "' class='title choice'>";
		theHTML += answers[i].answer;
		theHTML += "</div>";
	}
	document.getElementById('answers').innerHTML = theHTML;
	
	jQuery('.choice').click(function(){
		$('#description').html(active.answers[this.id].description);
		$(this).attr('class', $(this).attr('class') + ' selected');
		currentSelection = this.id;
		clearCSS();
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

function clearCSS(){
	var answerObjects = $('.choice');
	
	for(var i = 0; i < answerObjects.length; i++){
		if(!(i == currentSelection)){
			$(answerObjects[i]).attr('class', 'title choice');
		}
	}
}

$(document).ready(function(){
	$('#next').click(function(){
		sendAnswer();
	})
	
	$('#back').click(function(){
		goBack();
	})
})