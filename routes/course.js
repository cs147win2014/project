//var data = require("../data.json");
var models = require('../models');


// exports.addSyllabusFields = function(req, res) {
// 	allFields = req.body;
// 	var syllabus = {};
// 	var type = "";
// 	var weighting = "";
// 	console.log(allFields);
// 	for(var key in allFields) {
// 		if(key.match(/type/gi) != null) {
// 			type = allFields[key];
// 			console.log("TYPE: " + type);
// 		} else {
// 			weighting = allFields[key];
// 			console.log("WEIGHTING: " + weighting + " and the type is: " + type);
// 			if(isNaN(parseFloat(weighting))) {
// 				console.log("UGH ITS NOT A NUMBER U SUCK");
// 			} else {
// 				syllabus[type] = weighting;
// 			}
// 		}
// 	}
// 	console.log(syllabus);
// 	res.render('/index',data);
// 	return;
// };


exports.editSyllabus = function(req,res) {
	console.log('okay im editing the syllabus');
	console.log(req.body);
	var name = req.body.name;
	var value = req.body.value;
	var typeID = req.body.extraInfo;
	console.log(typeID);

	models.AssignmentType.findOne({"_id": typeID})
		.exec(function(err, elem) {
			if(err) console.log(err);
			if(name === "name") {
				elem.name = value;
			} else if (name === "weighting") {
				elem.weighting = value;
			} else {
				console.log("WHAT THE HECK IS GOING ON");
			}
			elem.save(function(err) {
				if(err) console.log(err);
				res.json(req.body);
				return;
			});
		});
	res.json(req.body);
	return;
};



exports.add = function(req, res) {    
	// Your code goes here%
	var newCourse = {department: req.body.department, 
					 number: req.body.number};

	data["courses"].push(newCourse);
	
	console.log(newCourse);
	// instead of rendering add screen, rendered data screen
	res.render('editCourse',data);
 }



exports.getCourseSyllabus = function(req, res) {
	var username = req.session.user;
	console.log('username is: ' + username);
	if(!username) {
		console.log('username undefined we should not do this');
		res.render('login', {error:"Please sign in first!"});
		return;
	}
	var actualUser = models.User.find({"username": username});

	if(actualUser.length != 0) {
    	var courseID = req.params.courseID;
    	console.log('heres the course ID: ' + courseID);

    	var selectedCourseArray = models.Course.find({"_id":courseID});
    	if (selectedCourseArray.length != 0) {
	    	selectedCourseArray.populate("syllabus")
	    	.exec(function(err, populatedCourse) {
	    		if(err) console.log(err);
	    		var syllabus = populatedCourse[0].syllabus;
	    		if(!syllabus) {
	    			console.log("NO SYLLABUS FOUND");
	    			res.json({});
	    		} else {
					console.log('here is the syllabus: ' + syllabus);
					res.json(syllabus);
				}
				return;
	    	});
    	}
  	} else {
    	console.log('couldnt find user ' + username);
    	res.render('login',{error:"Could not find user " + username});
    	return;
  	}
};