
var Mongoose = require('mongoose');


var UserSchema = new Mongoose.Schema({
  "name": String,
  "password": String,
  "classes": ClassSchema,
});

var ClassSchema = new Mongoose.Schema({
  "name": String,
  "number": Number,
  "department": String,
  "syllabus": SyllabusSchema
});



exports.Project = Mongoose.model('Project', ProjectSchema);


