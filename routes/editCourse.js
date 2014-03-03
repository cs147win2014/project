
var models = require('../models');
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

exports.addSyllabusFields_ajax = function(req, res) {
	allFields = req.body["allFields"];
	console.log("CALLING THE RIGHT FUNCTION");
	console.log(allFields);
	//var syllabus = {};
	var type = "";
	var weighting = "";
	console.log("here is the body:" + allFields);
	for(var i = 0; i < allFields.length; i++) {
		console.log(allFields[i]);
	}


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
				var newAssignmentTypeInfo = {"name": type, "weighting": weighting};
				var newAssignmentType = new models.AssignmentType(newAssignmentTypeInfo);
				newAssignmentType.save(afterSavingAssignmentType);

				function afterSavingAssignmentType(err) {
    				if(err) console.log(err);
    				console.log(newAssignmentType);
      				//Find the course and push the newCourse onto it's array of courses
    	models.User
    		.findOne({"username": user})
    		.exec(function(err, doc) {
      			if(err) {
              console.log('Error: ' + err);
            }
      			if(doc!=null) {
              console.log('here is the doc: ' + doc);
              doc.courses.push(newCourse);
      			  doc.save(function(err) {
      			 	  if(err) {
                  console.log('Error: ' + err);
                }
				        var sessionData = { "userData": doc, "user": user, "expand": false, "course": courseInfo};
      				  console.log("user data is " + sessionData["userData"]);
                console.log("user is " + sessionData["user"]);
                
					      res.render('editCourse',sessionData);
      			  });
      		  }
            else {
              console.log("doc is null, couldn't find username " + user);
              res.render('editCourse');
            }

          });
	};

				//syllabus[type] = weighting;
			}
		}
	}
	console.log(syllabus);
	// here is where you wanna mess with the database stuff then return other
	res.json(syllabus);
	return;
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
	// here is where you wanna mess with the database stuff then return other
	res.render('index',data);
	return;
};