
var Mongoose = require('mongoose');



var AssignmentTypeSchema = new Mongoose.Schema({
  "name": String,
  "weighting": Number
});



var SyllabusSchema = new Mongoose.Schema({
  "assignmentTypes": Array // array of assignment types
});


var CourseSchema = new Mongoose.Schema({
  "name": String,
  "department": String,
  "number": Number,
  "syllabus": Array // object id corresponding to the syllabus of the class
});


var UserSchema = new Mongoose.Schema({
  "name": String,
  "password": String,
  "classes": Array // array of object ids corresponding to the classes they are in
});









exports.User = Mongoose.model('User', UserSchema);
exports.Course = Mongoose.model('Course', CourseSchema);
exports.Syllabus = Mongoose.model('Syllabus', SyllabusSchema);
exports.AssignmentType = Mongoose.model('AssignmentType', AssignmentTypeSchema);


