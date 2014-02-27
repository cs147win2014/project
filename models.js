var Mongoose = require('mongoose');


var AssignmentTypeSchema = new Mongoose.Schema({
  "name": String,
  "weighting": Number
});



var SyllabusSchema = new Mongoose.Schema({
  // object ids corresponding to the assignmentTypes of the class
  "assignmentTypes": [{ type: Mongoose.Schema.Types.ObjectId, ref: 'AssignmentType' }]
});


var CourseSchema = new Mongoose.Schema({
  "name": String,
  "department": String,
  "number": Number,
  // object id corresponding to the syllabus of the class
  "syllabus": { type: Mongoose.Schema.Types.ObjectId, ref: 'Syllabus' }
});


var UserSchema = new Mongoose.Schema({
  "name": String,
  "password": String,
  // array of object ids corresponding to the classes they are in
  "courses": [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});



exports.User = Mongoose.model('User', UserSchema);
exports.Course = Mongoose.model('Course', CourseSchema);
exports.Syllabus = Mongoose.model('Syllabus', SyllabusSchema);
exports.AssignmentType = Mongoose.model('AssignmentType', AssignmentTypeSchema);


