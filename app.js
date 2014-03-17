//Module dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var mongoose = require('mongoose');

//Routes
var add = require ('./routes/add');
var course = require('./routes/course');
var editCourse = require ('./routes/editCourse');
var login = require ('./routes/login');
var view = require('./routes/view');

// Connect to the Mongo database, whether locally or on Heroku
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

//COOKIES
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Routes - Getting and Posting
    //Routes we definitely use
app.get('/',login.viewLogin);
app.get('/login', login.viewLogin);
app.get('/signup', login.viewSignup);
app.post('/signup', login.verifySignup);

// i think we should change the name of these and/or consolidate them
app.get('/addAssignment',add.addAssignment);
app.post('/editCourseAJAX',editCourse.addSyllabusFields_ajax);
app.post('/deleteCourseAJAX',editCourse.deleteCourse_ajax);
app.post('/deleteTypeAJAX',editCourse.deleteType_ajax);
app.post('/deleteAssignmentAJAX',editCourse.deleteAssignment_ajax);

    //Do we use these?

app.put('/post',course.editSyllabus);
app.post('/addCourse', add.addCourse);
app.get('/addACourse',view.viewAddCoursePage);
//app.get('/editCourse', view.viewEditCourse);
app.get('/index',view.viewIndex);
app.post('/login',login.checkUsername);

app.get('/courses/:courseID/syllabus', course.getCourseSyllabus);
app.get('/course/:courseID', view.viewCoursePage);
app.get('/addAssignment/:courseID', view.viewAddAssignmentPage);
app.get('/getAssignments/:courseID',view.getAssignments);

//app.post('/addACourse/new',course.add);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
