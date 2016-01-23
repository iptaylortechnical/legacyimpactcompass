var socket = io(':3000');
socket.on ('q', function(messageFromServer){
	console.log ('server said: ' + messageFromServer);
});