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