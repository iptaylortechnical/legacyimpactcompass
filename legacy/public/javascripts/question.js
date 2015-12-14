function goNext(goto){
	yo = parseInt(goto) + 1;
	if(yo < 5){
		document.location = "/q?p=" + yo;
	}
}

function goPrev(goto){
	yo = parseInt(goto) - 1;
	
	if(yo > 0){
		document.location = "/q?p=" + yo;
	}
}

$(document).ready(function(){
	
	$('.next').css('background-color', '#BBBBBB');
	
	jQuery('.choice').click(function(){
		$(this).css('color', 'grey')
		$(this).css('border', '1px solid lightgreen')
		$('.next').css('background-color', '#65D074');
	})
})
