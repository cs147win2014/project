var data = require("../data.json");
var models = require('../models');

exports.add = function(req, res) {    
	var user = req.session.user;
  //ONLY DO THIS IF COURSE DOESN'T ALREADY EXIST?????????
  var courseInfo = {"name": req.body.name,
                    "department": req.body.department, 
                    "number": req.body.number};
	var newCourse = new models.Course(courseInfo);

	newCourse.save(afterSaving);
	
	function afterSaving(err) {
    	if(err) console.log(err);
    	console.log("new course made is" + newCourse);
      var id = newCourse._id;
      console.log("id number is" + newCourse._id);
      //Find the user and push the newCourse onto it's array of courses
    	models.User
    		.findOne({"username": user}) 
    		.exec(function(err, doc) {
      			if(err) {
              console.log('Error: ' + err);
            }
      			if(doc!=null) {
              console.log('here is the doc: ' + doc);
              doc.courses.push(newCourse);
      			  doc.save(function(err) {
      			 	  if(err) {
                  console.log('Error: ' + err);
                }
				        var sessionData = { "userData": doc, "user": user, "expand": false, "course": newCourse, "idNumber": id};
      				  console.log("user data is " + sessionData["userData"]);
                console.log("user is " + sessionData["user"]);
                
					      res.render('editCourse',sessionData);
      			  });
      		  }
            else {
              console.log("doc is null, couldn't find username " + user);
              res.render('editCourse');
            }

          });
	};

 }