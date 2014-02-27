var data = require("../data.json");

exports.viewCoursePage = function(req, res) { 
  var courseName = req.params.courseName; 
  console.log(courseName);

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

  var courseData = { 'department':department,
                     'number':number};


  //var number = req.params.number; 

  // this is where we will go through data and systematically construct a JSON of
  // all the data we need to render this page

  console.log("The course name is: " + courseName);
  console.log(courseData);
  res.render('course', courseData);
};
