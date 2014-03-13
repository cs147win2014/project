
var models = require('../models');
var data = require("../data.json");

exports.addAssignment = function(req, res) {    
	// Your code goes here%
	var newAssignment = {name: req.query.name, 
					 type: req.query.type, 
					 score: req.query.score,
					 total: req.query.total};

	data["assignments"].push(newAssignment);
	
	console.log(newAssignment);
	// instead of rendering add screen, rendered data screen
	res.render('editCourse',data);
 };

exports.view = function(req, res){
	
	console.log(data);
	res.render('editCourse',data);
};

exports.addSyllabusFields_ajax = function(req, res) {
	allFields = req.body;
	console.log("CALLING THE RIGHT FUNCTION");
	console.log(allFields);
	
	//Get the course ID number
	var id = "";
	for(var key in allFields) {
		if(key.match("courseId")) {
			id = allFields[key];
		}
	}

	//Find the corresponding course in the database, add the assignment types to it
	models.Course
		.findOne({"_id": id})
		.populate("syllabus")
		.exec(function(err, course) {
      		if(err) {
              	console.log('Error: ' + err);
            }
      		if(course!=null) {
              	console.log('here is the course: ' + course);

              	//Syllabus will hold type-weighting paris
				var newSyllabus = {};
				//Keys will hold index-type pairs (for saving)
				var keys = {};
				//Will keep track of how many assignment types there are
				var count = 0;

				var type = "";
				var weighting = "";

				var oldSyllabus = course.syllabus;
				console.log(oldSyllabus);

				function inSyllabus(aType) {
					for(var i = 0; i < oldSyllabus.length; i++) {
						var oldAssign = oldSyllabus[i];
						console.log("comparison assign name: " + oldAssign.name);
						console.log("our assign name: " + aType);
						if(aType.match(oldAssign.name)) return true;
					}
					return false;
				}

				var badWeight = false;

				//Create the type-weighting map and the index-type map
				for(var key in allFields) {
					//It's not the course ID
					console.log(allFields[key]);
					if(!key.match("courseId") && !inSyllabus(allFields[key]) && !badWeight) {
						//It's a type
						if(key.match(/type/gi) != null) {
							type = allFields[key];
							console.log("TYPE: " + type);
							badWeight = false;
						//It's a weighting
						} else {
							weighting = allFields[key];
							console.log("WEIGHTING: " + weighting + " and the type is: " + type);
							if(isNaN(parseFloat(weighting))) {
								console.log("UGH ITS NOT A NUMBER U SUCK");
							} else {
								newSyllabus[type] = weighting;
								keys[count] = type;
								count++;
							}
						}
					}
					badWeight = inSyllabus(allFields[key]);
				}
				console.log(newSyllabus);
				console.log(count);
				addToDatabase(0);
				var syllabusInfo = {};
				//Recursiveley add the assignment types to the database and their ID's to the given course
				function addToDatabase(index) {
					if(index < count) {
						type = keys[index];
						weighting = newSyllabus[type];
						var newAssignmentTypeInfo = {"name": type, "weighting": weighting};
						var newAssignmentType = new models.AssignmentType(newAssignmentTypeInfo);
						newAssignmentType.save(function(err) {
							if(err) console.log(err);
    						console.log(newAssignmentType);
	    					course.syllabus.push(newAssignmentType);
    						course.save(function(err) {
    							if(err) {
	                  				console.log('Error: ' + err);
 				               	}
 				               	console.log("id is " + newAssignmentType._id);
 				               	console.log("new assignment type info is " + newAssignmentTypeInfo);
 				               	syllabusInfo[newAssignmentType._id] = newAssignmentTypeInfo;
	    						addToDatabase(index + 1);
 		   					});
						});
					} else {
						var returnData = {"syllabus": syllabusInfo, "department": course.department, "number": course.number};
						console.log("OUT");
						console.log(course);
						console.log(syllabusInfo);
						res.json(returnData);
						return;
					}
				}
			}
		});
	// // here is where you wanna mess with the database stuff then return other
};


exports.deleteType_ajax = function(req, res) {
	var typeID = req.body.ID;
	console.log("CALLING THE DLETE TYPE FUNCTION");
	console.log(typeID);
	
	//Find the corresponding type in the database, delete it
	models.AssignmentType
		.findOne({"_id": typeID})
		.remove()
		.exec(function(err) {
      		if(err) console.log(err);
			res.send();
		});
}


exports.delete_ajax = function(req, res) {
	var courseID = req.body.ID;
	console.log("CALLING THE DLETE FUNCTION");
	console.log(courseID);
	
	//Find the corresponding course in the database, delete it
	models.Course
		.findOne({"_id": courseID})
		//.populate("syllabus")
		.exec(function(err, course) {
      		if(err) console.log(err);
      		if(course!=null) {
              	console.log('here is the course: ' + course);
				var syllabusArray = course.syllabus;
				console.log(syllabusArray);
				var length =  syllabusArray.length;
				deleteSyllabus(0);

				function deleteSyllabus(index) {
					if(index < length) {
						models.AssignmentType.find({"_id": syllabusArray[index]})
							.remove()
							.exec(function(err) {
								if(err) console.log(err);
								deleteSyllabus(index + 1);
							});
					}
				}

				var assignmentArray = course.assignments;
				var asignlength =  assignmentArray.length;
				deleteAssign(0);

				function deleteAssign(index) {
					if(index < asignlength) {
						models.Assignment.find({"_id": assignmentArray[index]})
							.remove()
							.exec(function(err) {
								if(err) console.log(err);
								deleteAssign(index + 1);
							});
					}
				}
			}
		});
	models.Course.find({"_id": courseID})
		.remove()
		.exec(function(err) {
			if(err) console.log(err);
			res.send();
		});
}




exports.addSyllabusFields = function(req, res) {
	allFields = req.body;

	var syllabus = {};
	var type = "";
	var weighting = "";
	console.log(allFields);
	for(var key in allFields) {
		if(key.match(/type/gi) != null) {
			type = allFields[key];
			console.log("TYPE: " + type);
		} else {
			weighting = allFields[key];
			console.log("WEIGHTING: " + weighting + " and the type is: " + type);
			if(isNaN(parseFloat(weighting))) {
				console.log("UGH ITS NOT A NUMBER U SUCK");
			} else {
				syllabus[type] = weighting;
			}
		}
	}
	console.log(syllabus);
	// here is where you wanna mess with the database stuff then return other
	res.render('index',data);
	return;
};


