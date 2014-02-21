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


exports.viewCoursePage = function(req, res) { 
  var department = req.params.department; 
  //var number = req.params.number; 
  console.log("The course name is: " + department);
  res.render('course', {
  	'course department': department
//  	'number': number
  });
};
