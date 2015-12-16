var boxState = [
	false,
	false
]

$(document).ready(function(){
	$('.client').click(function(){
		boxID = $(this).attr('id');
		
		if(!boxState[boxID-1]){
			$('#' + boxID + 'd').css('max-height', 'none');
		}else{
			$('#' + boxID + 'd').css('max-height', '0');
		}
		
		boxState[boxID-1] = !boxState[boxID-1];
		
	});
});