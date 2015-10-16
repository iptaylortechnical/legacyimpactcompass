$(document).ready(function(){
	jQuery('#username').blur(function(){
		var ob = jQuery('#username');

		request = ob.val();
		if(request){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			  if (xhttp.readyState == 4 && xhttp.status == 200) {
			    var res = xhttp.responseText;
					var username = document.getElementById('username');
					if(res == '1'){
						username.style.border = '1px solid green';
					}else{
						username.style.border = '1px solid red';
					}
			  }
			}

			xhttp.open("GET", "/check?" + request, true);
			xhttp.send();
		}
	});
	
	for(i = 1; i < 6; i++){
		jQuery("#" + i).keypress(function () {
	        jQuery('#' + (parseInt(jQuery(':focus').attr('id'))+1)).focus();
	    });
	}//stepping
	
	jQuery('#6').keypress(function(k){
		var str = '';
		for(i = 1; i < 7; i++){
			str += jQuery('#' + i).val();
		}
		
		getTicket(str+String.fromCharCode(k.keyCode));
	})
	
});

send = 0;

function getTicket(str){
	alert('here');
	var send = jQuery.ajax('/check?isaiah', 'GET');
	
	send.done(function(res){
		imgurl = res.url;
		advname = res.name;
		advtext = res.text;
		
		jQuery('#img').attr('src', imgurl);
		jQuery('#advname').innerHTML = advname;
		jQuery('#advtext').innerHTML = advtext;
		
	});
}