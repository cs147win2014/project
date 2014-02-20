'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})


function initializePage() {
	
}

function loadClassInfo(className) {
	e.preventDefault();
	alert("Loading info for " + className);
	console.log("Loading info for " + className);
	$.get('/class/'+className,alert('hey'));
}
