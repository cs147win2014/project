'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#loginBtn').click(login);
}


function login() {
	e.preventDefault();
	$.get('/login',checkCredentials);
}


function checkCredentials(result) {
	e.preventDefault();
	console.log(result);


	/*


	var username = req.query.username; 
	var password = req.query.password; 
	
	
	var foundUsername = false;
	for (var key in data["users"][0]) {
   		if (data["users"][0].hasOwnProperty(key) ){
   			if(key==username && data["users"][0][key] == password) {
	       		console.log( "key:"+key+", val:"+data["users"][0][key] );
	       		res.render('index',data);
	       		return true;
	       	}
   		}
	}
	console.log("Username or password incorrect");
	*/

}