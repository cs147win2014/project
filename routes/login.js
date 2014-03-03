// Get all of our friend data
var data = require('../data.json');
var models = require('../models');


exports.view = function(req, res){
	req.session.user = "Guest";
	res.render('login');
};

exports.checkUsername = function(req, res) {    
	
	var username = req.body.username; 
	var password = req.body.password; 
	
	var error = "";


	models.User.find({ "username": username }, function (err, reqUser) {
  		if (err) { console.log(err) };
  		console.log("the requested user search returned " + reqUser);

  		if (reqUser.length) { //there is a user with that username
  			var associatedPassword = reqUser[0].password;
  			console.log(associatedPassword);
  			if(associatedPassword === password) {
  				req.session.user = username;
  				res.redirect('index');
  				return;
  			} else {
  				error = "Password incorrect!";
  			}
  		} else {
  			error = "Username not found!";
  		}
	});

	console.log("Username or password incorrect");
	error = "Username or password incorrect";
	//console.log("The error is: " + error);
	res.render('login',{error:error});
	
 };

exports.signUp = function(req, res) {    
	// Your code goes here%
	
	var username = req.body.username; 
	var email = req.body.email;
	var password = req.body.password; 
	var verification = req.body.verification;
	var error = null;
	// regexp from https://github.com/angular/angular.js/blob/master/src/ng/directive/input.js#L4
	var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;


	if(error) {
		res.status(403);
	  res.render('signup', {
	    error: error
	  });
	  return;
	}

	// check for valid inputs
	if (!username || !email || !password || !verification) {
	  error = 'All fields are required!';
	} else if (username !== encodeURIComponent(username)) {
	  error = 'Username may not contain any non-url-safe characters!';
	} else if (!email.match(EMAIL_REGEXP)) {
	  error = 'Email is invalid!';
	} else if (password !== verification) {
	  error = 'Passwords don\'t match!';
	}

	if (error) {
	  res.status(403);
	  res.render('signup', {
	    error: error
	  });
	  return;
	}
	

	// check if username is already taken -- if not, enter them into the database
	models.User.find({ "username": username }, function (err, inUse) {
  		if (err) { console.log(err) };
  		console.log("the inUse search returned " + inUse);
  		if (!inUse.length) { //can't take another user's username
			var newUser = new models.User({ "username" : username, "password" : password });
			console.log(newUser);
			newUser.save(afterSaving);
  			
  			function afterSaving(err) {
    			if(err) console.log(err);
    			console.log(newUser + " was saved");
	  			req.session.user = username;
				res.redirect('index');
  			};

  		} else {
  			res.status(403);
    		res.render('signup', {
     			error: 'Username is already taken!'
    		});
    		return;
  		}
	});
 };



exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  form_data.title = form_data.project_title;

  var newProj = new models.Project(form_data);
  newProj.save(afterSaving);

  function afterSaving(err) {
    if(err) console.log(err);
    res.send();
  };
}
