'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#courseSubmitBtn').click(addCourse);


	function addCourse() {
		console.log('clicked');
		var name = $('#new-course-form #name').val();
		var department = $('#new-course-form #department').val();
		var number = $('#new-course-form #number').val();
		var syllabus = $('#new-course-form #syllabus').val();
		var json = {
			'name': title,
			'department': image_url,
			'number':  date,
			'syllabus': summary
		};
		$.post('/addACourse/new', json, function() {
			window.location.href = 'index'; // reload the page
		});
	} 
}

