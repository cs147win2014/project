var Mongoose = require('mongoose');


var AssignmentTypeSchema = new Mongoose.Schema({
  "name": String,
  "weighting": Number
});


var AssignmentSchema = new Mongoose.Schema({
  "name": String,
  "type": { type: Mongoose.Schema.Types.ObjectId, ref: 'AssignmentType' },
  "score": Number,
  "total": Number,
  "course": String,
});


var CourseSchema = new Mongoose.Schema({
  "name": String,
  "department": String,
  "number": String,
  // object id corresponding to the syllabus of the class
  "syllabus": [{ type: Mongoose.Schema.Types.ObjectId, ref: 'AssignmentType' }]
});


var UserSchema = new Mongoose.Schema({
  "username": String,
  "password": String,
  // array of object ids corresponding to the classes they are in
  "courses": [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  "assignments": [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Assignment' }]
});



exports.User = Mongoose.model('User', UserSchema);
exports.Course = Mongoose.model('Course', CourseSchema);
exports.AssignmentType = Mongoose.model('AssignmentType', AssignmentTypeSchema);
exports.Assignment = Mongoose.model('Assignment', AssignmentSchema);


