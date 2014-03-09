
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var mongoose = require('mongoose');

//var addACourse = require('./routes/addACourse');
//var index = require('./routes/index');
var add = require ('./routes/add');
//var viewAssignments = require('./routes/viewAssignments');
//var info = require('./routes/info');
//var viewCourses = require('./routes/viewCourses');
var addCourse = require ('./routes/addCourse');
var editCourse = require ('./routes/editCourse');
var login = require ('./routes/login');
// var signup = require('./routes/signup');
var course = require('./routes/course');
//var assignment = require('./routes/assignment');

var view = require('./routes/view');

// Example route
// var user = require('./routes/user');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'project';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();
//var MongoStore = require('connect-mongo')(express);


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

//COOKIES!!
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());

// {
// 	//FROM THE INTERNETS
//   store: new MongoStore({
//     url: 'mongodb://root:myPassword@mongo.onmodulus.net:27017/3xam9l3'
//   }),
//   secret: '1234567890QWERTY'
// })

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ADD ROUTES HERE
    //Routes we definitely use
app.get('/',login.view);
app.get('/login', login.view);
app.get('/signup',function(req, res) {
  res.render('signup');
});
app.post('/signup',login.signUp);

// i think we should change the name of these and/or consolidate them
app.get('/addAssignment',add.addAssignment);
app.post('/editCourse',editCourse.addSyllabusFields);
app.post('/editCourseAJAX',editCourse.addSyllabusFields_ajax);
app.post('/deleteCourseAJAX',editCourse.delete_ajax);

app.get('/viewAssignments',view.viewAssignments);
app.get('/viewAssignments/test', view.viewAssignmentsTest);

//app.get('/viewAssignments/test2', view.viewAssignmentsTest2);



    //Do we use these?


app.get('/info',view.viewInfo);
app.put('/post',course.editSyllabus);

//app.get('/viewCourses',viewCourses.view);
app.post('/addCourse',addCourse.add);
app.get('/addACourse',view.viewAddCoursePage);
//app.get('/addAssignment',view.viewAddAssignmentPage);
app.get('/editCourse',editCourse.view);
app.get('/index',view.viewIndex);
app.post('/login',login.checkUsername);

app.get('/courses/:courseID/syllabus', course.getCourseSyllabus);
app.get('/course/:courseID', view.viewCoursePage);
app.get('/addAssignment/:courseID', view.viewAddAssignmentPage);
app.get('/getAssignments',view.getAssignments);

app.post('/addACourse/new',course.add);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
