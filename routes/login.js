// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	//console.log(data);
	res.render('login',data);
};

exports.checkUsername = function(req, res) {    
	// Your code goes here%
	
	var username = req.query.username; 
	var password = req.query.password; 
	
	
	var foundUsername = false;
	for (var key in data["users"][0]) {
   		if (data["users"][0].hasOwnProperty(key) ){
   			if(key==username && data["users"][0][key] == password) {
	       		console.log( "key:"+key+", val:"+data["users"][0][key] );
	       		res.render('index',data);
	       		return;
	       	}
   		}
	}
	console.log("Username or password incorrect");
	res.render('login',data);
	
 };