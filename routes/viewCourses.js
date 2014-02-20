// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	
	console.log(data);
	res.render('viewCourses',data);
};

exports.getCourseData = function(req,res) {
	// this is where i construct a json to return
	// that contains the name of the course, syllabus info
	// as well as all the assignments tagged with that 
	
}
