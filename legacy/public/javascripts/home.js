$(document).ready(function(){
	$('.next').click(function(){
		window.location = '/' + this.id;
	})
	
	$('.nomen').click(function(){
		window.location = '/logout';
	})
})