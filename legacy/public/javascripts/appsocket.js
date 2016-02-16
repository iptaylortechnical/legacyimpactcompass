var PRODUCTION = false;


var socket = io(PRODUCTION ? ':80' : ':3000');
var active = {};

var multi = {};
var currentSelection;

var maxChildIndex;

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
			if(!multi[this.id]){
				$(this).addClass('selected');
				multi[this.id] = active.answers[this.id];
			}else{
				$(this).removeClass('selected');
				delete multi[this.id];
			}
		})
	
		$('#0').click();
	}
	
	if(active.type == 'children'){
		
		maxChildIndex = 0;
		
		document.getElementById('qtitle').innerHTML = "Please fill out for each of your children:";
		
		document.getElementById("content").innerHTML = "<div id='childrenholder' class='childrenholder'><div id='child0' class='achild'><label>Name: </label><input id='name0' class='name' label='Name:'><label>Date: </label><input id='year0' class='name' label='Year:'></div></div><div id='add' class='addchild'>+</div>";
		
		$('#add').click(function(){
			
			maxChildIndex++;
			
			$('#childrenholder').append("<div id='child" + maxChildIndex + "' class='achild'><label>Name: </label><input id='name" + maxChildIndex + "' class='name' label='Name:'><label>Date: </label><input id='year" + maxChildIndex + "' class='name' label='Year:'></div>");
		
		})
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
		
		var multiSend = [];
		var multiKeys = Object.keys(multi);
		
		for(var i = 0; i < multiKeys.length; i++){
			multiSend[i] = active.answers[multiKeys[i]].answer;
		}
		
		console.log(multiSend);
		
		socket.emit('a', JSON.stringify({
			"answer": multiSend,
			"answerIndex": currentSelection
		}))
	}
	
	if(type == 'children'){
		var toSend = [];
		
		for(var i = 0; i < maxChildIndex + 1; i++){
			//TODO: GET YEAR
			toSend.push({
				name: $('#name' + i).val(),
				year: $('#year' + i).val(),
				isMinor: (2016 - parseInt($('#year' + i).val())) < 18
			});
		}
		
		socket.emit('a', JSON.stringify({
			"answer": toSend,
			"answerIndex": 0
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