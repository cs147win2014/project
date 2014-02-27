'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})


function initializePage() {
	$('#typeSelect').hide();
    $('#courseSelect').on('change', function(event) {
        $('#typeSelect').show();
    });

    $('#addAssignmentBtn').click(addAssignment);
    $('#backBtn').click(goBack);
}

function addAssignment() {
	console.log("user clicked add assignment button");
	window.location.href = "/addAssignment"; // load the page

	//$.get("/addACourse");
}

function goBack(e) {
    e.preventDefault();
    window.location.href = "javascript:history.back();";
}
