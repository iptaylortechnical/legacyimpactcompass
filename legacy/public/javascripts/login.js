var allReady = {
	username:false,
	password:false
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
					if(res == '0'){
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
		if(jQuery('#password').val()){
			setReady('password', true);
			jQuery('#password').css('border', '2px solid #2ECC40');
		}else{
			setReady('password', false);
			jQuery('#password').css('border', '2px solid #FF4136');
		}
	})
	
});

function setReady(idstr, good){
	allReady[idstr] = good;
	console.log(allReady);
	if(allReady.username && allReady.password){
		jQuery('#submit').removeAttr('disabled');
		jQuery('#submit').css('color', 'white');
	}else{
		jQuery('#submit').attr('disabled', 'true');
		jQuery('#submit').css('color', 'grey');
	}
}