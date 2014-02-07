var data = require("../data.json");

exports.add = function(req, res) {    
	// Your code goes here%
	var newCourse = {department: req.query.department, 
					 number: req.query.number, 
					 title: req.query.title,
					 professor: req.query.professor,
					 quarter: req.query.quarter,
					 year: req.query.year};

	data["courses"].push(newCourse);
	
	console.log(newCourse);
	// instead of rendering add screen, rendered data screen
	res.render('addCourse',data);
 }