var PRODUCTION = false;


var socket = io(PRODUCTION ? ':80' : ':3000');
var active = {};

var multi = {};
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
	if(active.type == 'static'){
		document.getElementById('qtitle').innerHTML = active.title;
	
		var theHTML = '';
		
		var answers = active.answers;
		
		document.getElementById('content').innerHTML = '<div id="answers" 0="" auto;="" width:="" class="dashboard display-animation"></div>';

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
	
	if(active.type == 'flatinput'){
		document.getElementById('qtitle').innerHTML = active.title;
		
		var defaultAns = active.answers[0];
		
		document.getElementById('content').innerHTML = '<input id="ans" placeholder="' + defaultAns.answer + '"/>';
		
		currentSelection = 0;
		
	}
	
	if(active.type == 'multi'){
		document.getElementById('qtitle').innerHTML = active.title;
		
		currentSelection = 0;
		
		var theHTML = '';
		
		var answers = active.answers;
		
		document.getElementById('content').innerHTML = '<div id="answers" 0="" auto;="" width:="" class="dashboard display-animation"></div>';

		for(var i = 0; i < answers.length; i++){
			theHTML += '<a id="' + i + '" class="tile tile-lg tile-sqr tile-grey ripple-effect animated"  0.41s;"><span class="content-wrapper"><span class="tile-content"><span class="tile-img"  url(http://www.google.com/design/images/design-minutes.png);"></span><span class="tile-holder tile-holder-sm"><span class="title">' + answers[i].description + '</span></span></span></span><span class="ink animate"  270px; width: 270px; top: 104px; left: -44px;"></span></a>';
		}
	
		document.getElementById('answers').innerHTML = theHTML;
	
		jQuery('.tile').click(function(){
			if(multi[this.id]){
				$(this).addClass('selected');
				multi[this.id] = active.answers[this.id];
			}else{
				$(this.id).removeClass('selected');
				delete multi[this.id];
			}
		})
	
		$('#0').click();
	}
}

function sendAnswer(type){
	//previous
	// socket.emit('a', JSON.stringify({"answer":currentSelection}));
	
	//new
	if(type == 'static'){
		socket.emit('a', JSON.stringify({
			"answer":active.answers[currentSelection].answer,
			"answerIndex":currentSelection
		}));
	}
	
	if(type == 'flatinput'){
		socket.emit('a', JSON.stringify({
			"answer": document.getElementById('ans').value,
			"answerIndex": currentSelection
		}))
	}
	
	if(type == 'multi'){
		socket.emit('a', JSON.stringify({
			"answer": multi,
			"answerIndex": currentSelection
		}))
	}
	
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
		sendAnswer(active.type);
	})
	
	$('#back').click(function(){
		goBack();
	})
})