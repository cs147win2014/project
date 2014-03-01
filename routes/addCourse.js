var data = require("../data.json");
var models = require('../models');

exports.add = function(req, res) {    
	var user = req.session.user;

	var newCourse = new models.Course({"name": req.body.name,
					 				  "department": req.body.department, 
					 				  "number": req.body.number});

	newCourse.save(afterSaving);
	
	function afterSaving(err) {
    	if(err) console.log(err);
    	console.log(newCourse);
    	models.User
    		.findOne({"username": user})
    		.exec(function(err, doc) {
      			if(err) console.log(err);
      			console.log(doc);
      			doc.courses.push(newCourse);
      			doc[0].save(function(err) {
      				if(err) console.log(err);
	      			var results = doc[0];
	      			console.log(doc[0]);
				    var sessionData = { "userData": results, "user": user, "expand": false};
      				console.log("user data is " + sessionData);
					res.render('editCourse',sessionData);
      			});
      		});
	};

 }