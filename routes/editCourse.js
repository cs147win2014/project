

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

	var syllabus = {};
	var type = "";
	var weighting = "";
	console.log(allFields);
	for(var key in allFields) {
		if(key.match(/type/gi) != null) {
			type = allFields[key];
			console.log("TYPE: " + type);
		} else {
			weighting = allFields[key];
			console.log("WEIGHTING: " + weighting + " and the type is: " + type);
			if(isNaN(parseFloat(weighting))) {
				console.log("UGH ITS NOT A NUMBER U SUCK");
			} else {
				syllabus[type] = weighting;
			}
		}
	}
	console.log(syllabus);
	// here is where you wanna mess with the database stuff then return other things.
	res.render('editCourse',data);
	return;
};