var data = require("../data.json");

exports.addAssignment = function(req, res) {    
	// Your code goes here%
	var newAssignment = {name: req.query.name, 
					 type: req.query.type, 
					 score: req.query.score,
					 total: req.query.total};

	data[2]["assignments"].push(newAssignment);
	
	console.log(newAssignment);
	// instead of rendering add screen, rendered data screen
	res.render('viewAssignments',data);
 }