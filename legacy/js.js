bank = '';

address = "q1.tA"

test =
{
	info: {
		options: {
			0: "q1",
			1: "q2"
		},
		num: 2,
		names: [
			"First Question", 
			"Second Question"
		],
		nomen: "masterswitch",
		address: "none"
	},
	q1: {
		info: {
			options: {
				0: "fA",
				1: "sA",
				2: "tA"
			},
			num: 3,
			names: [
				"first answer",
				"second answer",
				"third answer"
			],
			nomen: "First Question",
			address: "q1"
		},
		fA: "first",
		sA: "second",
		tA: {
			info: {
				options: {
					0: "lel",
					1: "reqt",
					2: "scrub"
				},
				num: 3,
				names: [
					"laughing eut loud",
					"wrecked",
					"all the stalls"
				],
				nomen: "third answer",
				address: "q1.tA"
			},
			lel: "mmhmm",
			reqt: "done got",
			scrub: "u know it"
		}
	},
	q2: {
		info: {
			options: {
				0: "fA",
				1: "sA",
				2: "tA"
			},
			num: 3,
			names: [
				"first answer",
				"second answer",
				"third answer"
			],
			nomen: "Second Question",
			address: "q2"
		},
		fA: "irst",
		sA: "scond",
		tA: "thrd"
	}
};

choice0 = test[test.info.options[0]];
choice0_0 = choice0[choice0.info.options[0]];


function strip(go){
	var len = go.info.num;
	bank += "<div>";
	for(var i = 0; i<len; i++){
		console.log(i);
		var choice = go[go.info.options[i]];
		if(typeof(choice) == 'string'){
			bank += '<div>' + choice + ': ' + go.info.names[i] + '</div>';
			console.log(go.info.options[i] + '  ' + choice + '  ' + go.info.names[i]);
		}else{
			strip(choice);
		}
	}
	bank += "</div>";
}

addressB = address.split('.');
holder = test[addressB[0]];

for(i = 1; i < addressB.length; i++){
	holder = holder[addressB[i]];
}

strip(holder);
console.log(bank);