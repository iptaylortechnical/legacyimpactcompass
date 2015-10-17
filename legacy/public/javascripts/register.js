var allReady = {
	username:false,
	password:false,
	ticket:false
}

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
						username.style.border = '2px solid #2ECC40';
						setReady('username', true);
					}else{
						username.style.border = '2px solid #FF4136';
						setReady('username', false);
					}
			  }
			}

			xhttp.open("GET", "/check?" + request, true);
			xhttp.send();
		}
	});
	
	jQuery('#password').blur(function(){
		setReady('password', true);
		jQuery('#password').css('border', '2px solid #2ECC40');
	})
	
	for(i = 1; i < 6; i++){
		jQuery("#" + i).keypress(function (k) {
			k.preventDefault();
			jQuery(':focus').html('');
			jQuery(':focus').val(String.fromCharCode(k.keyCode).toUpperCase());
			var ids = '#' + (parseInt(jQuery(':focus').attr('id'))+1);
			jQuery(ids).focus();
	  });
	}//stepping/clearing
	
	jQuery('#6').keypress(function(k){
		k.preventDefault();
		jQuery(':focus').html('');
		jQuery(':focus').val(String.fromCharCode(k.keyCode).toUpperCase());
		
		var str = '';
		for(i = 1; i < 7; i++){
			str += jQuery('#' + i).val();
		}
		
		getTicket(str.toUpperCase());
	})
	
});

send = 0;

function getTicket(str){
	var send = jQuery.ajax('/ticket?'+str, 'GET');
	
	send.done(function(res){
		if(res){
			document.getElementById('ticket').style.border = '2px solid #2ECC40';
		
			imgurl = res.imgurl;
			advname = res.samplename;
			advtext = res.sampletext;
		
			jQuery('#img').attr('src', imgurl);
			jQuery('#advname').html(advname);
			jQuery('#advtext').html(advtext);
			
			setReady('ticket', true);
		}else{
			document.getElementById('ticket').style.border = '2px solid #FF4136';
			setReady('ticket', false);
		}
	});
}

function setReady(idstr, good){
	allReady[idstr] = good;
	console.log(allReady);
	if(allReady.username && allReady.password && allReady.ticket){
		console.log('test');
		jQuery('#submit').removeAttr('disabled');
		jQuery('#submit').css('color', 'white');
	}
}