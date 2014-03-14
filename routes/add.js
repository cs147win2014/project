var data = require("../data.json");
var models = require('../models');


exports.addAssignment = function(req, res) { 
	var courseID = req.query.course; 
	console.log('courseid: ' + courseID);

	var newAssignmentData = {"name": req.query.name, 
					 	 	 "type": req.query.type, 
					 	 	 "score": req.query.score,
					 	 	 "total": req.query.total,
					 	 	 "course": req.query.course};

	var percent = parseFloat(req.query.score)/parseFloat(req.query.total);
	newAssignmentData["percent"] = percent;
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;

	var actualAssignmentType = models.AssignmentType.find({"_id": req.query.type});
	if(actualAssignmentType.length != 0) {
		actualAssignmentType.exec(function(err, foundAssignmentType) {
			if(foundAssignmentType) {
				newAssignmentData["shortName"] = foundAssignmentType[0].name + ' ' + mm + '-' + dd;
				console.log(newAssignmentData);
				var newAssignment = new models.Assignment(newAssignmentData);
				newAssignment.save(afterSavingAssignment);

				function afterSavingAssignment(err) {
					if(err) console.log(err);
				  	var user = req.session.user;
	  				//console.log(user);
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
				        	console.log("course populated user???")
		        			console.log(doc[0]);
				        	var hasCourses;
		    	    		if(doc[0].courses.length) { //false if no courses
	    	    	  			hasCourses = true;
				    	    } else {
	        				  	hasCourses = false;
				        	}
			        		doc[0].assignments.push(newAssignment);
	    		    		doc[0].save(afterSavingUser);

			        		function afterSavingUser(err) {
					        	if(err) console.log(err);
	        					var actualCourse = models.Course.find({"_id": courseID});
						        if(actualCourse.length != 0) {
				    		      	actualCourse.exec(function(err, foundCourse) {
				        		    	if(err) { // There was no user ID provided
				            			  	console.log(err);
				            			} else { // There was a user ID provided
				            				console.log("course before");
	 			             				console.log(foundCourse[0]);
		 			             			foundCourse[0].assignments.push(newAssignment);
		 				             		foundCourse[0].save(afterSavingCourse);

		 				             		function afterSavingCourse(err) {
												if(err) console.log(err);
					            				console.log("course after");
	 				             				console.log(foundCourse[0]);
					  							var actualUser2 = models.User.find({"username": user});
			  									if(actualUser2.length != 0) {
	    		  									actualUser2.populate("courses")
	    		  									.populate("assignments")
	    		  									.exec(function(err, sessionUser) {
				        								if(err) {console.log(err)};
				        								console.log("course/assign populated user???")
		        										console.log(sessionUser[0]);

							  							var actualCourse2 = models.Course.findOne({"_id": courseID});
					  									if(actualCourse2.length != 0) {
	    		  											actualCourse2.populate("syllabus")
	    		  											.populate("assignments")
	    		  											.exec(function(err, coursePage) {
													          	if(err) console.log(err);
													        	console.log(coursePage);
													            console.log("POPULATED COURSE data is.........");
													        	console.log(coursePage);
 													            console.log("atual TABLE data is.........");
													            var assignmentData = coursePage.assignments;
													            var syllabusData = coursePage.syllabus;
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
              													var sessionData = { "userData": sessionUser[0], 
                              														"user": user, 
                              														"hasCourses": hasCourses,
                              														"course": coursePage,
                              														"types": typeArray,
                              														"assignPage": true};
              													res.render('course',sessionData);
              													return;
        													});
	    		  										}
		              								});
	    		  								}
	    	        						}
		        	    				}
	    	      					});
	      						}
		      				}
		      			});
		  			} else {
	    				console.log('couldnt find user ' + user);
				    	res.render('login',{error:"Could not find user " + user});
	    				return;
	  				}
	  			}
 			}
			else {
				console.log('no assignment types!');
				res.render('login',{error:""});
			}
		});
	}
}