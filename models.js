
var Mongoose = require('mongoose');


var UserSchema = new Mongoose.Schema({
  "name": String,
  "password": String,
  "classes": [ClassSchema]
});



var ClassSchema = new Mongoose.Schema({
  "name": String,
  "number": Number,
  "department": String,
  "syllabus": SyllabusSchema
});



var SyllabusSchema = new Mongoose.Schema({
  "assignments": [AssignmentTypeSchema]
});



var AssignmentTypeSchema = new Mongoose.Schema({
  "name": String,
  "percent": Number
});



exports.Project = Mongoose.model('Project', ProjectSchema);


