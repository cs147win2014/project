var data = require("../data.json");

exports.add = function(req, res) {    
	// Your code goes here%
	var newCourse = {department: req.query.department, 
					 number: req.query.number};

	data["courses"].push(newCourse);
	
	console.log(newCourse);
	// instead of rendering add screen, rendered data screen
	res.render('viewCourses',data);
 }