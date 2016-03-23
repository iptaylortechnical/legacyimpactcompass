var PRODUCTION = false;

var multi = {};
var currentSelection;

var maxChildIndex;
		
		jQuery('.tile').click(function(){
			$('#description').html(active.answers[this.id].description);
			$(this).addClass('selected');
			currentSelection = this.id;
				$('.tile').not(this).removeClass('selected');
		})
	
		$('#0').click();
	
		currentSelection = 0;
		
	
	
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

function sendAnswer(type){
	
	
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

$(document).ready(function(){
	$('#next').click(function(){
		sendAnswer(active.type);
	})
	
	$('#back').click(function(){
		goBack();
	})
})