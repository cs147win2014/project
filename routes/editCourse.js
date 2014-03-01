

var data = require("../data.json");

exports.addAssignment = function(req, res) {    
	// Your code goes here%
	var newAssignment = {name: req.query.name, 
					 type: req.query.type, 
					 score: req.query.score,
					 total: req.query.total};

	data["assignments"].push(newAssignment);
	
	console.log(newAssignment);
	// instead of rendering add screen, rendered data screen
	res.render('editCourse',data);
 };

exports.view = function(req, res){
	
	console.log(data);
	res.render('editCourse',data);
};

exports.addSyllabusFields = function(req, res) {
	allFields = req.body;

	console.log(allFields);
	var numFields = parseInt(allFields["numFields"]);
	for(var i = 0; i < numFields; i++) {
		var type = allFields["type"+(i+1)].trim();
		var weight = allFields["weighting"+(i+1)].trim();
		console.log("Type: " + type + "\nWeight: " + weight);
		var numWeight = parseFloat(weight);
		if(isNaN(numWeight)) {
			console.log("UGH ITS NOT A NUMBER U SUCK");
		}
	}
	/*for (var key in allFields) {
		// first find the number like typeN, weightingN
		/* once you have that number you should go in and say
		type = allFields["type"+N];
		weighting = allfields["weighting"+N];

		var syllabusText = allFields[key];
		console.log(key);
		var commaIndex = syllabusText.indexOf(",");
		if(commaIndex == -1 || commaIndex == syllabusText.length-1) {
			console.log("incorrect type formatting :[");
			break;
		}
		else {
			var assignmentType = syllabusText.substr(0,commaIndex).trim();
			var assignmentWeight= syllabusText.substr(commaIndex+1).trim();
			console.log(assignmentType + " is worth " + parseFloat(assignmentWeight)*100 + "% of your final grade");
			console.log("Here is where you would add it, but unfortunately, I have no idea which course to add this syllabus information to! How depressing");
			console.log("And since I didn't trigger an AJAX request - I instead submitted a form - I have no idea how to even asynchronously display the data. So great.");
		}
	}*/


	res.render('editCourse',data);
	return;
};