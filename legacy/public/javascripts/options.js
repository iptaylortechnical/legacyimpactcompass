var options = {};

$(document).ready(function(){
	$('.option').click(function(){
		if(!!options[this.id]){
			delete options[this.id];
		}else{
			options[this.id] = this.id;
		}
		
		$(this).toggleClass('selected');
	});
	
	$('.submit').click(function(){
		var theList = Object.keys(options);
		
		window.location = '/setoptions?ids=' + theList.join(',');
	})
})