var data = require("../data.json");
var models = require('../models');


/* not currently in use
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
*/

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
	res.render('/index',data);
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

exports.viewCourseInfo = function(req, res) {    
	// Your code goes here%
	var courseName = req.params.id;

	var match = courseName.search(/\d/);
	if(match === NaN) {
		// no coursenumber!! eek
	}

	var department = courseName.substr(0,match);
	var number = courseName.substr(match);

	var courseInfo = false;

  	// find the stuff you want inside the JSON and return it
	allCourses = data[1]['courses'];
	for(var i = 0; i < allCourses.length; i++) {
		if(allCourses[i].department.toLowerCase() === department.toLowerCase()) {
			if(allCourses[i].number.toLowerCase() === number.toLowerCase()) {
				courseInfo = allCourses[i];
				break;
			}
		}
	}

	console.log(courseInfo);

	if(!courseInfo) {
		console.log("Unable to find course " + department.toUpperCase() + " " + number);
		res.json({"data":"NONE"});
	}
	else {
		console.log(courseInfo);
		res.json(courseInfo);
	}
	
	// instead of rendering add screen, rendered data screen
	//res.render('/courses/'+courseName,data);
	
 };

exports.getCourseSyllabus = function(req,res) {
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
  	} 
  	else {
    	console.log('couldnt find user ' + username);
    	res.render('login',{error:"Could not find user " + username});
    	return;
  	}
};