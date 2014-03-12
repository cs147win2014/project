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

							  							var actualCourse2 = models.Course.find({"_id": courseID});
					  									if(actualCourse2.length != 0) {
	    		  											actualCourse2.populate("syllabus")
	    		  											//.populate("assignments")
	    		  											.exec(function(err, coursePage) {
				        										if(err) {console.log(err)};
				        										console.log("syllabus/assign populated course???")
		        												console.log(coursePage[0]);
		        												var assignmentArray = coursePage[0].assignments;
		        												var length = assignmentArray.length;
		        												var finalAssignmentData = [];
		        												populateAssignmentType(0);
		        												function populateAssignmentType(index) {
		        													if(index < length) {
              															var currAssignID = assignmentArray[index];
              															models.Assignment.findOne({"_id": currAssignID})
                															.populate("type")
                															.exec(function(err, populatedAssignment) {
                  															if(err) console.log(err);
                  															console.log(populatedAssignment);
                  															finalAssignmentData.push(populatedAssignment);
                  															populateAssignmentType(index + 1);
                														});
            														}
		        												}
									              				var sessionData = { "userData": sessionUser[0], 
	        		    	        	        	      							"user": user, 
	                			        	          								"hasCourses": hasCourses,
	                    			        	      								"course": coursePage[0],
	                    			        	      								"assignments": finalAssignmentData}
	              												console.log("user data is " + sessionData);
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