// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);
	res.render('addACourse',data);
};


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