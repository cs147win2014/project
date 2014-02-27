// Get all of our friend data
var data = require('../data.json');
var models = require('../models');


exports.view = function(req, res){
	//console.log(data);
	res.render('login');
};

exports.checkUsername = function(req, res) {    
	// Your code goes here%
	
	var username = req.body.username; 
	var password = req.body.password; 
	
	
	var foundUsername = false;
	var userDb = data["users"];
	var error = "";

	// check if username is already taken
	for (var i = 0; i < userDb.length; i++) {
	 	if (userDb[i].username === username) {
	 		foundUsername = true;
	 		if(userDb[i].password === password) {
	 			data["currentUser"] = username;
	 			res.render('index',data);
	 			return;
	 		} else {
	 			error = "Password incorrect!";
	 			break;
	 		}
	 	}
	}

	if(!foundUsername) {
		error = "Username not found!";
	}

	console.log("Username or password incorrect");
	res.render('login',{error:error});
	
 };

exports.signIn = function(req, res) {    
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
	

	//var userDb = data["users"];
	
	
	//console.log(models);
	// check if username is already taken -- this doesn't work
	//var inUse = models.User.find({'username': username});
	//console.log(inUse);
	models.User.find({ "username": username }, function (err, inUse) {
  		if (err) { console.log(err) };
  		console.log("the inUse search returned " + inUse);
  		if (!inUse.length) { 
			var newUser = new models.User({ "username" : username, "password" : password });
			console.log(newUser);
			newUser.save(afterSaving);
  			
  			function afterSaving(err) {
    			if(err) console.log(err);
    			console.log(newUser + " was supposedly saved");
    			//res.send();
  			};
  			
			res.render('index',newUser);


  		} else {
  			res.status(403);
    		res.render('signup', {
     			error: 'Username is already taken!'
    		});
    		return;
  		}
	});


	/*for (var i = 0; i < userDb.length; i++) {
	 	if (userDb[i].username === username) {
	  		res.status(403);
	    	res.render('signup', {
	     		error: 'Username is already taken!'
	    	});
	    	return;
		}
	}
	*/


/*

	data["users"].push(newUser);
	data["currentUser"] = username;
	
	res.render('index',data);
	*/
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
