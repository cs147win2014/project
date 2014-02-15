
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var add = require ('./routes/add');
var viewAssignments = require('./routes/viewAssignments');
var info = require('./routes/info');
var viewCourses = require('./routes/viewCourses');
var addCourse = require ('./routes/addCourse');
var editCourse = require ('./routes/editCourse');
var login = require ('./routes/login');
// Example route
// var user = require('./routes/user');

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
app.get('/addCourse',addCourse.add);
app.get('/editCourse',editCourse.view);
app.get('/index',index.view)
app.get('/login',login.checkUsername);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
