var boxState = [
	false,
	false
]

$(document).ready(function(){
	$('.client').click(function(){
		boxID = $(this).attr('id');
		
		if(!boxState[boxID-1]){
			$(this).css('background-color', '#EFEFEF');
			$('#' + boxID + 'd').css('max-height', '500');
		}else{
			$('#' + boxID + 'd').css('max-height', '0');
			$(this).css('background-color', 'transparent');
		}
		
		boxState[boxID-1] = !boxState[boxID-1];
		
	});
});