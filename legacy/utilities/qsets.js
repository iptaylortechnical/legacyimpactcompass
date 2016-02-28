module.exports = {
	sample: function(nomen){
		return {
			"qid": nomen + "-how-many-children",
			"title": "How many children do you have?",
			"type": "static",
			"description": "Please select the number of children you hav.",
			"answers": [
				{
					"description": "5 children",
					"answer": 5,
					"type": "static",
					"offspring": {
						"hasChildren": true,
						"childCount": 2
					},
					"children": [
						{
							"qid": nomen + "-kind-of-tacos",
							"title": "What kind of tacos?",
							"description": "What kind of tacos do you prefer?",
							"answers": [
								{
									"description": "meat taco",
									"answer": "meat",
									"offspring": {
										"hasChildren": true,
										"childCount": 1
									},
									"children": [
										{
											"qid": nomen + "-kind-of-meat",
											"title": "What kind of meat?",
											"description": "What kind of meat do you like on your sub?",
											"answers": [
												{
													"description": "ham meat",
													"answer": "ham",
													"offspring": {
														"hasChildren": false
													}
												}
											]
										}
									]
								},
								{
									"description": "veggie taco",
									"answer": "veggie",
									"offspring": {
										"hasChildren": false
									}
								}
							]
						},
						{
							"qid": nomen + "-kind-of-subs",
							"title": "What kind of subs?",
							"description": "What kind of subway sandwhiches do they like?",
							"answers": [
								{
									"description": "meatball sub sandwhich",
									"answer": "meatball",
									"offspring": {
										"hasChildren": false
									}
								},
								{
									"description": "chicken bacon ranch melt sub sandwhich",
									"answer": "cbrm",
									"offspring": {
										"hasChildren": false
									}
								}
							]
						}
					]
				},
				{
					"description": "6 children",
					"answer": 6,
					"offspring": {
						"hasChildren": false
					}
				},
				{
					"description": "7 children",
					"answer": 7,
					"offspring": {
						"hasChildren": false
					}
				},
				{
					"description": "8 children",
					"answer": 8,
					"offspring": {
						"hasChildren": false
					}
				}
			]
		}
	}
}