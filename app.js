
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var mongoose = require('mongoose');

var addACourse = require('./routes/addACourse');
var index = require('./routes/index');
var add = require ('./routes/add');
var viewAssignments = require('./routes/viewAssignments');
var info = require('./routes/info');
var viewCourses = require('./routes/viewCourses');
var addCourse = require ('./routes/addCourse');
var editCourse = require ('./routes/editCourse');
var login = require ('./routes/login');
var signup = require('./routes/signup');
var course = require('./routes/course');
var assignment = require('./routes/assignment');

// Example route
// var user = require('./routes/user');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'project';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/',login.view);
app.get('/add',add.addAssignment);
app.get('/viewAssignments',viewAssignments.view);
app.get('/info',info.view);
app.get('/viewCourses',viewCourses.view);
app.post('/addCourse',addCourse.add);
app.get('/addACourse',addACourse.view);
app.get('/editCourse',editCourse.view);
app.get('/index',index.view)
app.post('/login',login.checkUsername);
app.get('/signup',function(req, res) {
	res.render('signup');
});

app.post('/signup',signup.signIn);
app.post('/editCourse',editCourse.addSyllabusFields)
app.post('/addACourse/new', project.addProject);

app.post('/signup/check/username', function(req, res) {
  var username = req.body.username;
  // check if username contains non-url-safe characters
  if (username !== encodeURIComponent(username)) {
    res.json(403, {
      invalidChars: true
    });
    return;
  }
  // check if username is already taken - query your db here
  var usernameTaken = false;
  for (var i = 0; i < dummyDb.length; i++) {
    if (dummyDb[i].username === username) {
      usernameTaken = true;
      break;
    }
  }
  if (usernameTaken) {
    res.json(403, {
      isTaken: true
    });
    return
  }
  // looks like everything is fine
  res.send(200);
});
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
