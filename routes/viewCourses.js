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
  var courseName = req.params.courseName; 
  console.log(courseName);
  var courseData = data["navbar"];
  courseData.push({'department':courseName});
  //var number = req.params.number; 

  // this is where we will go through data and systematically construct a JSON of
  // all the data we need to render this page

  console.log("The course name is: " + courseName);
  console.log(courseData);
  res.render('course', courseData);
};
