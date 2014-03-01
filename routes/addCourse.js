var data = require("../data.json");

exports.add = function(req, res) {    
	// Your code goes here%
	var newCourse = new models.Course({"name": req.body.name,
					 				  "department": req.body.department, 
					 				  "number": req.body.number});

	newCourse.save(afterSaving);
	
	function afterSaving(err) {
    	if(err) console.log(err);
  	};


	//data["courses"].push(newCourse);
	
	//data["navbar"]["courses"].push(newCourse);
	
	console.log(newCourse);
	// instead of rendering add screen, rendered data screen
	res.render('editCourse',data);
 }