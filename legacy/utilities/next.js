module.exports = {
	getHierarchy: function (sessionID, intent, authUtil, done){
		if(intent == 'profile'){
			done(require('./socket/hier'));
		}
	
		if(intent == 'survey'){
			var tempHier = require('./socket/hier');
			authUtil.getSurvey(sessionID, function(e, surv){
				tempHier.setData(surv);
				done(tempHier);
			})
		}
	},
	
}