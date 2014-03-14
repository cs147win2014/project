var data = require("../data.json");
var models = require('../models');


exports.viewCoursePage = function(req, res) { 
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
        .populate("syllabus")
        .populate("assignments")
        //.populate("assignments.type")
        .exec(function(err, actualCourse) {
          if(err) console.log(err);
          console.log(actualCourse);
          //var assignmentArray = actualCourse.assignments;
          //var length = assignmentArray.length;
          //var finalAssignmentData = [];
          console.log("POPULATED COURSE data is.........");
          console.log(actualCourse);
          console.log("atual TABLE data is.........");
          var assignmentData = actualCourse.assignments;
          var syllabusData = actualCourse.syllabus;
          var syllength = syllabusData.length;
          var assignlength = assignmentData.length;
          var typeArray = [];
          var typeIDToName = {};
          for (var i = 0; i < syllength; i++) {
            var currTypeData = {};
            var currType = syllabusData[i];
            var currName = currType.name;
            var currTypeID = currType._id;
            currTypeData["name"] = currName;
            typeIDToName[currType._id] = currName;
            currTypeData["assignments"] = [];
            currTypeData["hasAssigns"] = false;
            typeArray.push(currTypeData);
          }
          for (var j = 0; j < assignlength; j++) {
            var currAssign = assignmentData[j];
            var testTypeID = currAssign.type;
            var testName = typeIDToName[testTypeID];
            for (var k = 0; k < syllength; k++) {
              var currTypeData = typeArray[k];
              var typeName = currTypeData.name;
              if (typeName === testName) {
                typeArray[k].assignments.push(currAssign);
                typeArray[k].hasAssigns = true;
              }
            }
          }
          console.log("TYPE ARRAY IS=============");
          console.log(typeArray);
//var finalAssignmentData = [];
          // populateAssignmentType(0);

          // function populateAssignmentType(index) {
          //   if(index < length) {
          //     var currAssignID = assignmentArray[index];
          //     models.Assignment.findOne({"_id": currAssignID})
          //       .populate("type")
          //       .exec(function(err, populatedAssignment) {
          //         if(err) console.log(err);
          //         console.log(populatedAssignment);
          //         finalAssignmentData.push(populatedAssignment);
          //         populateAssignmentType(index + 1);
          //       });
          //   } else {
              var sessionData = { "userData": results, 
                              "user": user, 
                              "hasCourses": hasCourses,
                              "course": actualCourse,
                              "types": typeArray,
                              "assignPage": false};
              //console.log("user data is " + sessionData);
              res.render('course',sessionData);
              return;
          //   }
          // }
        });
    });
  } else {
    console.log('couldnt find user ' + username);
    res.render('login',{error:"Could not find user " + username});
    return;
  }
};



exports.viewAssignments = function(req, res){
  console.log(data);
  data["progressTabFirst"] = false;
  res.render('viewAssignments',data);

};


exports.viewAssignmentsTest = function(req, res){
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
      var hasCourses;
      if(doc[0].courses.length) { //false if no courses
        hasCourses = true;
      } else {
        hasCourses = false;
      }
      var sessionData = { "userData": doc[0], 
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
        var actualCourse = models.Course.findOne({"_id": courseID});

        if(actualCourse.length == 0) {
          console.log("no course provided");
          var sessionData = { "userData": results, 
                              "user": user, 
                              "hasCourses": hasCourses,
                              "courseKnown": false};
          console.log("user data is " + sessionData);
          res.render('addAssignment',sessionData);
          return;
        } else {
          actualCourse.populate("syllabus")
          .populate("assignments")
          .exec(function(err, actualCourse) {
            if(err) { // There was no user ID provided
              console.log(err);
            } else { // There was a user ID provided
              console.log(actualCourse);
              var sessionData = { "userData": results, 
                                  "user": user, 
                                  "hasCourses": hasCourses,
                                  "course": actualCourse,
                                  "courseKnown": true};
              console.log("user data is " + sessionData);
              res.render('addAssignment',sessionData);
              return;
            }
          });
        }
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
  var courseID = req.params.courseID; 
  console.log(courseID);
  var course = models.Course.findOne({"_id": courseID});
  if(course.length == 0) {
    console.log("no course provided");
    res.json({});
    return;
  } else {
    course.populate("assignments")
      .populate("syllabus")
      .exec(function(err, actualCourse) {
        if(err) {
          console.log(err);
        } else {
          console.log("atual course is.........");
          console.log(actualCourse);
          var assignmentData = actualCourse.assignments;
          var syllabusData = actualCourse.syllabus;
          var syllength = syllabusData.length;
          var assignlength = assignmentData.length;
          var typeNameToAssignArray = {};
          var typeIDToName = {};
          for (var i = 0; i < syllength; i++) {
            var currType = syllabusData[i];
            var currName = currType.name;
            typeNameToAssignArray[currName] = [];
            typeIDToName[currType._id] = currName;
          }
          for (var i = 0; i < assignlength; i++) {
            var currAssign = assignmentData[i];
            var typeID = currAssign.type;
            var typeName = typeIDToName[typeID];
            typeNameToAssignArray[typeName].push(currAssign);
          }
          console.log(typeNameToAssignArray);
          res.json(typeNameToAssignArray);
          return;
        }
      });
  }
}

exports.getAssignmentsAndWeights = function(req, res) { 
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
        .populate("syllabus")
        .populate("assignments")
        //.populate("assignments.type")
        .exec(function(err, actualCourse) {
          if(err) console.log(err);
          console.log(actualCourse);
          //var assignmentArray = actualCourse.assignments;
          //var length = assignmentArray.length;
          //var finalAssignmentData = [];
          console.log("POPULATED COURSE data is.........");
          console.log(actualCourse);
          console.log("atual TABLE data is.........");
          var assignmentData = actualCourse.assignments;
          var syllabusData = actualCourse.syllabus;
          var syllength = syllabusData.length;
          var assignlength = assignmentData.length;
          var typeArray = [];
          var typeIDToName = {};
          for (var i = 0; i < syllength; i++) {
            var currTypeData = {};
            var currType = syllabusData[i];
            var currName = currType.name;
            var currTypeID = currType._id;
            currTypeData["name"] = currName;
            typeIDToName[currType._id] = currName;
            currTypeData["assignments"] = [];
            currTypeData["hasAssigns"] = false;
            typeArray.push(currTypeData);
          }
          for (var j = 0; j < assignlength; j++) {
            var currAssign = assignmentData[j];
            var testTypeID = currAssign.type;
            var testName = typeIDToName[testTypeID];
            for (var k = 0; k < syllength; k++) {
              var currTypeData = typeArray[k];
              var typeName = currTypeData.name;
              if (typeName === testName) {
                typeArray[k].assignments.push(currAssign);
                typeArray[k].hasAssigns = true;
              }
            }
          }
          console.log("TYPE ARRAY IS=============");
          console.log(typeArray);
//var finalAssignmentData = [];
          // populateAssignmentType(0);

          // function populateAssignmentType(index) {
          //   if(index < length) {
          //     var currAssignID = assignmentArray[index];
          //     models.Assignment.findOne({"_id": currAssignID})
          //       .populate("type")
          //       .exec(function(err, populatedAssignment) {
          //         if(err) console.log(err);
          //         console.log(populatedAssignment);
          //         finalAssignmentData.push(populatedAssignment);
          //         populateAssignmentType(index + 1);
          //       });
          //   } else {
              var sessionData = { "userData": results, 
                              "user": user, 
                              "hasCourses": hasCourses,
                              "course": actualCourse,
                              "types": typeArray};
              //console.log("user data is " + sessionData);
              res.render('course',sessionData);
              return;
          //   }
          // }
        });
    });
  } else {
    console.log('couldnt find user ' + username);
    res.render('login',{error:"Could not find user " + username});
    return;
  }
};














