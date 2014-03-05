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
  allCourses = data[1]['courses'];
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
  data["progressTabFirst"] = false;
  var user = req.session.user;
  console.log(user);
  if(!user) {
    console.log('username undefined we should not do this');
    res.render('login', {error:"Please sign in first!"});
    return;
  }
  
  //query database - get array of json situations
  var actualUser = models.User.find({"username": user});
  if(actualUser.length != 0) {
    res.render('viewAssignments',data);
    return;
  } 
  else {
    console.log('couldnt find user ' + username);
    res.render('login',{error:"Could not find user " + username});
    return;
  }
};

exports.viewInfo = function(req, res){
  console.log(data);
  res.render('info',data);
};

exports.viewIndex = function(req, res){
  var username = req.session.user;
  console.log(username);
  if(!username) {
    console.log('username undefined we should not do this');
    res.render('login', {error:"Please sign in first!"});
    return;
  }
  //query database - get array of json situations
  var actualUser = models.User.find({"username": username});
  if(actualUser.length != 0) {
    actualUser.populate("courses")
    .exec(function(err, doc) {
      if(err) {console.log(err)};
      console.log(doc[0]);
      var results;
      results = doc[0];
      // if (!doc.length) { //no result was found aka user isn't in the database aka user was "Guest"
      //   results = data; 
      // } else { //user is in the database, use their data
      //   results = doc[0];
      // }
      var hasCourses;
      if(doc[0].courses.length) { //false if no courses
        hasCourses = true;
      } else {
        hasCourses = false;
      }
      var sessionData = { "userData": results, "user": username, "expand": false, "hasCourses": hasCourses};
      console.log("user data is " + sessionData);
      res.render('index',sessionData);
    });
  } else {
    console.log('couldnt find user ' + username);
    res.render('login',{error:"Could not find user " + username});
    return;
  }
};

exports.viewIndexExpand = function(req, res) {
  data['expand'] = true;
  console.log(data);
  res.render('index',data);
};

exports.viewAddCoursePage = function(req, res) {
  console.log(data);
  res.render('addACourse',data);
}

exports.viewAddAssignmentPage = function(req, res) {
  
  var user = req.session.user;
  console.log(user);
  if(!user) {
    console.log('username undefined we should not do this');
    res.render('login', {error:"Please sign in first!"});
    return;
  }
  
  //query database - get array of json situations
  var actualUser = models.User.find({"username": user});
  if(actualUser.length != 0) {
    actualUser.populate("courses")
    .exec(function(err, doc) {
      if(err) {console.log(err)};
      console.log(doc[0]);
      var results;
      results = doc[0];
      // if (!doc.length) { //no result was found aka user isn't in the database aka user was "Guest"
      //   results = data; 
      // } else { //user is in the database, use their data
      //   results = doc[0];
      // }
      var hasCourses;
      if(doc[0].courses.length) { //false if no courses
        hasCourses = true;
      } else {
        hasCourses = false;
      }
      var sessionData = { "userData": results, "user": user, "expand": false, "hasCourses": hasCourses};
      console.log("user data is " + sessionData);
      res.render('addAssignment',sessionData);
      return;
    });
  } else {
    console.log('couldnt find user ' + user);
    res.render('login',{error:"Could not find user " + user});
    return;
  }
}

exports.getAssignments = function(req,res) {
  console.log('heres all your assignments');
  // query the database for all assignments
  // sorted by type
  //console.log(data[2]["assignments"]);
  res.json(data[2]["assignments"]);
}