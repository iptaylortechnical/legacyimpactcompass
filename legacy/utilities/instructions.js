module.exports = function(obj, answer){
	
	if(obj.name == null){
		if(answer){
			return {
				render: {
					type: 'flatinput',
					placeholder: 'XX',
					question: 'How old are you?'
				},
				storeAnswer: function(auth, sessionID, answer){
					auth.storeAnswer(sessionID, 'name', answer);
				}
			}
		}else{
			return {
				render: {
					type: 'flatinput',
					placeholder: 'John Smith',
					question: 'What is your name?'
				},
				storeAnswer: function(){
					
				}
			}
		}
	}
	
	if(obj.name == null){
		if(answer){
			return {
				render: {
					
				}
			}
		}else{
			return {
				render: {
					type: 'flatinput',
					placeholder: 'XX',
					question: 'How old are you?'
				},
				storeAnswer: function(){}
			}
		}
	}
}