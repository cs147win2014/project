'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})


function initializePage() {
	alert("loading");
}

function loadClassInfo(className) {
	e.preventDefault();
	alert("Loading info for " + className);
	//$.get('/login',checkCredentials);
}
