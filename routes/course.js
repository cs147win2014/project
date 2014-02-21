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
	res.render('add',data);
 }

// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);
	res.render('addACourse',data);
};


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
	for (var i = 0; i < req.body.length; i++) {
		console.log("HELLO"+i);
	}


	res.render('editCourse',data);
	return;
};


var data = require("../data.json");

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
	allCourses = data['courses'];
	for(var i = 0; i < allCourses.length; i++) {
		if(allCourses[i].department.toLowerCase() === department.toLowerCase()) {
			if(allCourses[i].number.toLowerCase() === number.toLowerCase()) {
				courseInfo = allCourses[i];
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
	
 }

// var models = require('../models');

// /*
//  * GET home page.
//  */

// exports.view = function(req, res){

// 	models.User
// 		.find()
// 		.sort('name')
// 		.exec(renderUsers);

// 	function renderUsers(err, users) {
// 		res.render('index', { 'users': users });
// 	}


// 	models.Course
// 		.find()
// 		.sort('department')
// 		.exec(renderCourse);

// 	function renderCourse(err, course) {
// 		res.render('index', { 'course': course });
// 	}


// 	models.Syllabus
// 		.find()
// 		.sort('assignments')
// 		.exec(renderSyllabus);

// 	function renderSyllabus(err, syllabus) {
// 		res.render('index', { 'syllabus': syllabus });
// 	}


// 	models.AssignmentType
// 		.find()
// 		.sort('name')
// 		.exec(renderAssignmentType);

// 	function renderAssignmentType(err, assignmentType) {
// 		res.render('index', { 'assignmentType': assignmentType });
// 	}

// };