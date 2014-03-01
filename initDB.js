
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'project';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data
var json = require('./data.json');
console.log("heyyyy");

// Step 2: Remove all existing documents
models.User.find().remove().exec(function(err) {
  models.Course.find().remove().exec(function(err) {
    models.AssignmentType.find().remove().exec(onceClear);  
  });
}); 
 
 

// Step 3: load the data from the JSON file
function onceClear(err) {
  console.log("hey");
  if(err) console.log(err);

  // reload the guest user data from the json
  var guest = new models.User(json[0]);
  guest.save(function(err, guest) {
    if(err) console.log(err);
    mongoose.connection.close()
  });
}

