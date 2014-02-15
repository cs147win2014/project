// Get all of our friend data
var data = require('../data.json');

exports.signIn = function(req, res) {    
	// Your code goes here%
	
	var username = req.body.username; 
	var email = req.body.email;
	var password = req.body.password; 
	var verification = req.body.verification;

	console.log("I GOT HERE!");
	var error = null;
	// regexp from https://github.com/angular/angular.js/blob/master/src/ng/directive/input.js#L4
	var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

	console.log(username + "." + email + "." + password + "." + verification);

	if(error) {
		res.status(403);
	  res.render('signup', {
	    error: error
	  });
	  return;
	}

	console.log("im checking real stuff");

	// check for valid inputs
	if (!username || !email || !password || !verification) {
	  error = 'All fields are required';
	} else if (username !== encodeURIComponent(username)) {
	  error = 'Username may not contain any non-url-safe characters';
	} else if (!email.match(EMAIL_REGEXP)) {
	  error = 'Email is invalid';
	} else if (password !== verification) {
	  error = 'Passwords don\'t match';
	}

	if (error) {
	  res.status(403);
	  res.render('signup', {
	    error: error
	  });
	  return;
	}
	

	var userDb = data["users"];

	// check if username is already taken
	for (var i = 0; i < userDb.length; i++) {
	 	if (userDb[i].username === username) {
	  		res.status(403);
	    	res.render('signup', {
	     		error: 'Username is already taken'
	    	});
	    	return;
		}
	}

	var newUser = { "username" : username,
				    "password" : password };
	data["users"].push(newUser);
	data["currentUser"] = username;
	
	res.render('index',data);
 };