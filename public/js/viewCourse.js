'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#mycoolbutton').click(editCourse);

}

function editCourse(e) {
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var courseName = $(this).closest("li").attr('id');
	// get rid of 'project' from the front of the id 'project3'
	alert(courseName);
	
	var url = "/courses/" + courseName;
	$.get(url);
} 


