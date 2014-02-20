
var Mongoose = require('mongoose');



var AssignmentTypeSchema = new Mongoose.Schema({
  "name": String,
  "percent": Number
});



var SyllabusSchema = new Mongoose.Schema({
  "assignments": [AssignmentTypeSchema]
});


var CourseSchema = new Mongoose.Schema({
  "name": String,
  "number": Number,
  "department": String,
  "syllabus": [SyllabusSchema]
});


var UserSchema = new Mongoose.Schema({
  "name": String,
  "password": String,
  "classes": [CourseSchema]
});









exports.User = Mongoose.model('User', UserSchema);
exports.Course = Mongoose.model('Course', CourseSchema);
exports.Syllabus = Mongoose.model('Syllabus', SyllabusSchema);
exports.AssignmentType = Mongoose.model('AssignmentType', AssignmentTypeSchema);


