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
	res.render('viewCourses',data);
};

exports.addSyllabusFields = function(req, res) {
	allFields = req.body;

	console.log(allFields);
	console.log("doing stuff now");
	for (var i = 0; i < allFields.length; i++) {
		console.log("HELLO"+i);
	}


	res.render('editCourse',data);
	return;
};