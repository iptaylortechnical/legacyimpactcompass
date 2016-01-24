$(document).ready(function(){
	console.log('test');
	$('.next').css('background-color', '#BBBBBB');
	
	jQuery('.choice').click(function(){
		console.log('othertest');
		$(this).css('color', 'grey')
		$(this).css('border', '1px solid lightgreen')
		$('.next').css('background-color', '#65D074');
	})
})

