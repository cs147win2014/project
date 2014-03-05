var data = require("../data.json");
var models = require('../models');


exports.viewCoursePage = function(req, res) { 
  var courseName = req.params.courseName; 
  console.log(courseName);

  var match = courseName.search(/\d/);
  if(match === NaN) {
    // no coursenumber!! eek
    console.log("There's no course number!!");
  }

  var department = courseName.substr(0,match);
  var number = courseName.substr(match);
  var user = req.session.user;

  //query database - get array of json situations
  var actualUser = models.User.find({"username": user});
  if(actualUser.length != 0) {
    actualUser.populate("courses")
    .exec(function(err, doc) {
      if(err) {console.log(err)};
      console.log(doc[0]);
      var results;
      results = doc[0];
      var hasCourses;
      if(doc[0].courses.length) { //false if no courses
        hasCourses = true;
      } else {
        hasCourses = false;
      }
      var courseInfo;
      var allCourses = results.courses;
      //Find the actual course we're rendering - first one in array, if there are multiple there will be a BUG!!!!
      for(var i = 0; i < allCourses.length; i++) {
        var curr = allCourses[i];
        if(curr.department.toLowerCase() === department.toLowerCase()) {
          if(curr.number.toLowerCase() === number.toLowerCase()) {
            courseInfo = curr;
          }
        }
      }
      console.log(courseInfo);

      var sessionData = { "userData": results,
                          "department": department,
                          "number": number,
                          "user": user, 
                          "hasCourses": hasCourses,
                          "course": courseInfo};

      //console.log("user data is " + sessionData);
      res.render('course',sessionData);
      return;
    });
  } 
  else {
    console.log('couldnt find user ' + username);
    res.render('login',{error:"Could not find user " + username});
    return;
  }
};



exports.viewAssignments = function(req, res){
  // var user = req.session.user;
  // console.log(user);
  // if(!user) {
  //   console.log('username undefined we should not do this');
  //   res.render('login', {error:"Please sign in first!"});
  //   return;
  // }
  
  // //query database - get array of json situations
  // var actualUser = models.User.find({"username": user});
  // if(actualUser.length != 0) {
  //   actualUser.populate("courses")
  //   .exec(function(err, doc) {
  //     if(err) {console.log(err)};
  //     console.log(doc[0]);
  //     var results;
  //     results = doc[0];
  //     var hasCourses;
  //     if(doc[0].courses.length) { //false if no courses
  //       hasCourses = true;
  //     } else {
  //       hasCourses = false;
  //     }
  //     var sessionData = { "userData": results,
  //                         "department": department,
  //                         "number": number,
  //                         "user": user, 
  //                         "progressTabFirst": false,
  //                         "hasCourses": hasCourses};
  //     console.log("user data is " + sessionData);
  //     res.render('viewAssignments',sessionData);
  //     return;
  //   });
  // } 
  // else {
  //   console.log('couldnt find user ' + username);
  //   res.render('login',{error:"Could not find user " + username});
  //   return;
  // }
  console.log(data);
  data["progressTabFirst"] = false;
  res.render('viewAssignments',data);

};




exports.viewAssignmentsTest = function(req, res){
  // var user = req.session.user;
  // console.log(user);
  // if(!user) {
  //   console.log('username undefined we should not do this');
  //   res.render('login', {error:"Please sign in first!"});
  //   return;
  // }
  
  // //query database - get array of json situations
  // var actualUser = models.User.find({"username": user});
  // if(actualUser.length != 0) {
  //   actualUser.populate("courses")
  //   .exec(function(err, doc) {
  //     if(err) {console.log(err)};
  //     console.log(doc[0]);
  //     var results;
  //     results = doc[0];
  //     var hasCourses;
  //     if(doc[0].courses.length) { //false if no courses
  //       hasCourses = true;
  //     } else {
  //       hasCourses = false;
  //     }
  //     var sessionData = { "userData": results,
  //                         "department": department,
  //                         "number": number,
  //                         "user": user, 
  //                         "progressTabFirst": true,
  //                         "hasCourses": hasCourses};
  //     console.log("user data is " + sessionData);
  //     res.render('viewAssignments',sessionData);
  //     return;
  //   });
  // } 
  // else {
  //   console.log('couldnt find user ' + username);
  //   res.render('login',{error:"Could not find user " + username});
  //   return;
  // }
  console.log(data);
  data["progressTabFirst"] = true;
  res.render('viewAssignments',data);
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
      var hasCourses;
      if(doc[0].courses.length) { //false if no courses
        hasCourses = true;
      } else {
        hasCourses = false;
      }
      var sessionData = { "userData": results, 
                          "user": username, 
                          "hasCourses": hasCourses};
      console.log("user data is " + sessionData);
      res.render('index',sessionData);
    });
  } else {
    console.log('couldnt find user ' + username);
    res.render('login',{error:"Could not find user " + username});
    return;
  }
};

exports.viewAssignmentsTest = function(req, res){
  //console.log(data);
  data["progressTabFirst"] = true;
  res.render('viewAssignments',data);
};


exports.viewInfo = function(req, res){
  console.log(data);
  res.render('index',data);
};

exports.viewAddCoursePage = function(req, res) {
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
      var hasCourses;
      if(doc[0].courses.length) { //false if no courses
        hasCourses = true;
      } else {
        hasCourses = false;
      }
      var sessionData = { "userData": results, 
                          "user": username, 
                          "hasCourses": hasCourses};
      console.log("user data is " + sessionData);
      res.render('addACourse',sessionData);
    });
  } else {
    console.log('couldnt find user ' + username);
    res.render('login',{error:"Could not find user " + username});
    return;
  }
}

exports.viewAddAssignmentPage = function(req, res) {
  var courseID = req.params.courseID; 
  console.log(courseID);
  
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
      var hasCourses;
      if(doc[0].courses.length) { //false if no courses
        hasCourses = true;
      } else {
        hasCourses = false;
      }
      models.Course.findOne({"_id": courseID})
        .exec(function(err, actualCourse) {
          if(err) console.log(err);
          console.log(actualCourse);
          var sessionData = { "userData": results, 
                              "user": user, 
                              "hasCourses": hasCourses,
                              "course": actualCourse};
          console.log("user data is " + sessionData);
          res.render('addAssignment',sessionData);
          return;
        });
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