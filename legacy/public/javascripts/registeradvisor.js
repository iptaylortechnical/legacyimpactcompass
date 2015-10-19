var advDefaults = {
	_url:'/images/grey-profile.jpg',
	_name:'John Smith',
	_text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi metus felis, porta ut mi vel, consectetur lobortis eros. Nam vel massa lacinia, pharetra massa in, dictum massa. Fusce dapibus tempus enim.'
}

var allReady = {
	username:false,
	password:false,
	ticket:false
}

$(document).ready(function(){
	
	jQuery('#imgsrc').
	
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

			xhttp.open("GET", "/checkadv?" + request, true);
			xhttp.send();
		}
	});//check valid username
	
	jQuery('#password').blur(function(){
		if(jQuery('#password').val()){
			setReady('password', true);
			jQuery('#password').css('border', '1px solid ghostwhite');
		}else{
			setReady('password', false);
			jQuery('#password').css('border', '2px solid #FF4136');
		}
	})
	
	for(i = 1; i < 6; i++){
		jQuery("#" + i).keypress(function (k) {
			k.preventDefault();
			jQuery('#ticketinput').val('');
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
		
		// getTicket(str.toUpperCase());
	})
	
});

send = 0;

// function getTicket(str){
// 	var send = jQuery.ajax('/ticket?'+str, 'GET');
//
// 	send.done(function(res){
// 		if(res){
// 			document.getElementById('ticket').style.border = '2px solid #2ECC40';
//
// 			imgurl = res.imgurl;
// 			advname = res.samplename;
// 			advtext = res.sampletext;
//
// 			jQuery('#img').attr('src', imgurl);
// 			jQuery('#advname').html(advname);
// 			jQuery('#advtext').html(advtext);
// 			jQuery('#ticketinput').val(str);
//
// 			setReady('ticket', true);
// 		}else{
// 			document.getElementById('ticket').style.border = '2px solid #FF4136';
//
// 			jQuery('#img').attr('src', advDefaults._url);
// 			jQuery('#advname').html(advDefaults._name);
// 			jQuery('#advtext').html(advDefaults._text);
// 			jQuery('#ticketinput').val('');
//
// 			setReady('ticket', false);
// 		}
// 	});
// }

function setReady(idstr, good){
	allReady[idstr] = good;
	console.log(allReady);
	if(allReady.username && allReady.password && allReady.ticket){
		console.log('test');
		jQuery('#submit').removeAttr('disabled');
		jQuery('#submit').css('color', 'white');
	}else{
		jQuery('#submit').attr('disabled', 'true');
		jQuery('#submit').css('color', 'grey');
	}
}