// Get all of our friend data
var data = require('../data.json');

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
	 			res.render('index',data);
	 			return;
	 		} else {
	 			error = "Password incorrect";
	 			break;
	 		}
	 	}
	}

	if(!foundUsername) {
		error = "Username not found";
	}

	console.log("Username or password incorrect");
	res.render('login',{error:error});
	
 };