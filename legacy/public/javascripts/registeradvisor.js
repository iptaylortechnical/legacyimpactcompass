var advDefaults = {
	_url:'/images/grey-profile.jpg',
	_name:'John Smith',
	_text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi metus felis, porta ut mi vel, consectetur lobortis eros. Nam vel massa lacinia, pharetra massa in, dictum massa. Fusce dapibus tempus enim.'
}

var allReady = {
	username:false,
	password:false,
	ticket:false,
	imgurl:false,
	samplename:false,
	sampletext:false
}

var sampleMatcherB = {
	advname:"samplename",
	advtext:"sampletext",
	imgsrc:"imgurl",
	advtext:"sampletext",
	advname:"samplename"
}

$(document).ready(function(){
	
	jQuery('#imgsrc').on('paste', checkImgUrl);
	
	jQuery('#imgsrc').blur(checkImgUrl);
	
	jQuery('#advname').change(sample);
	jQuery('#advtext').change(sample);
	
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
		
		getTicket(str.toUpperCase());
	})
	
});

send = 0;

function getTicket(str){
	var send = jQuery.ajax('/ticketavailable?'+str, 'GET');

	send.done(function(res){
		if(res == '1'){
			document.getElementById('ticket').style.border = '2px solid #2ECC40';
			jQuery('#ticketinput').val(str);
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
	if(allReady.username && allReady.password && allReady.ticket && allReady.imgurl && allReady.samplename && allReady.sampletext){
		console.log('test');
		jQuery('#submit').removeAttr('disabled');
		jQuery('#submit').css('color', 'white');
	}else{
		jQuery('#submit').attr('disabled', 'true');
		jQuery('#submit').css('color', 'grey');
	}
}

function checkImgUrl(e){
	var obj = jQuery(e.currentTarget);
	
	jQuery('#img').attr('src', obj.val());
	obj.css('border', '2px solid green');
	jQuery('#' + sampleMatcherB[obj.attr('id')]).val(obj.val());
	
	setReady('imgurl', true);
}

function sample(e){
	console.log('got it');
	
	obj = jQuery(e.currentTarget);
	
	jQuery('#' + sampleMatcherB[obj.attr('id')]).val(obj.val());
	
	setReady(sampleMatcherB[obj.attr('id')], true);
	
	obj.css('border', '1px solid #2ECC40');
}