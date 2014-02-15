'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#submitBtn').click(login);
}

function login() {
	alert('at this point, do not actually submit. instead just go to the next thing.');
	alert('make certain inputs in the form visible at this point');
}