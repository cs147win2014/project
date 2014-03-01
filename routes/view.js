var data = require("../data.json");
var models = require('../models');


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

exports.viewAssignments = function(req, res){
  
  console.log(data);
  res.render('viewAssignments',data);
};

exports.viewInfo = function(req, res){
  console.log(data);
  res.render('info',data);
};

exports.viewIndex = function(req, res){
  var user = req.session.user;
  console.log(user);
  //query database - get array of json situations
  models.User
    .find({"username": user})
    .exec(function(err, doc) {
      if(err) {console.log(err)};
      console.log(doc[0]);
      var results;
      if (!doc.length) { //no result was found aka user isn't in the database aka user was "Guest"
        results = data; 
      } else { //user is in the database, use their data
        results = doc[0];
      }
      var userData = { "results": results, "user": user, "expand": false};
      console.log("user data is " + userData);
      res.render('index',userData);
    });
};

exports.viewIndexExpand = function(req, res) {
  data['expand'] = true;
  console.log(data);
  res.render('index',data);
};

exports.viewAddCoursePage = function(req, res) {
  //alert("here123");
  console.log(data);
  res.render('addACourse',data);
}

exports.viewAddAssignmentPage = function(req, res) {
  //alert("here123");
  console.log(data);
  res.render('addAssignment',data);
}

exports.getAssignments = function(req,res) {
  console.log('heres all your assignments');
  res.json(data["assignments"]);
}