var data = require("../data.json");

exports.addAssignment = function(req, res) { 
	var courseID = req.params.courseID; 
	console.log(courseID);
	var newAssignment = {name: req.query.name, 
					 type: req.query.type, 
					 score: req.query.score,
					 total: req.query.total};
	var percent = parseFloat(req.query.score)/parseFloat(req.query.total);

	newAssignment["percent"] = percent;
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 

	newAssignment["shortName"] = req.query.type + ' ' + mm + '-' + dd;


	data[2]["assignments"].push(newAssignment);
	
	console.log(newAssignment);
	// instead of rendering add screen, rendered data screen
	//res.render('viewAssignments',data);
 }