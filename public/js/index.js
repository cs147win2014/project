'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#addCourseButton').click(addCourse);
	$('.courseButton').click(viewCourse);

}

function addCourse() {
	console.log("user clicked button");
	window.location.href = "/addACourse"; // load the page

	//$.get("/addACourse");
} 

function viewCourse(e) {
	e.preventDefault();
	// Get the div ID, e.g., "project3"
	var courseName = $(this).closest("li").attr('id');
	//alert(courseName);
	// get rid of 'project' from the front of the id 'project3'
	
	var url = "/courses/" + courseName;
	$.get(url, showCourseInfo);
} 

function showCourseInfo(result) {

	var syllabusDiv = $("#"+result.department+result.number+"syllabus");


	if(syllabusDiv.length) {
		//alert('syllabusdiv does exist');
		if(syllabusDiv.is(":visible")) {
			$("#viewButton"+result.department+result.number).text("More");
			syllabusDiv.hide();
		} else {
			$("#viewButton"+result.department+result.number).text("Less");
			syllabusDiv.show();
		}
	}
	else {
		//alert('syllabusdiv doesnt exist');

		// creates the div with a specific id for the class
		var $newSyllabusDiv = $("<div>", {id: result.department+result.number+"syllabus"});

		// $newSyllabusDiv.attr('id',result.department+result.number+'syllabus');
		// alert("heres the syllabus: " + JSON.stringify(result.syllabus));

		// $newSyllabusDiv.text(JSON.stringify(result.syllabus));

		// created what will be the formatted list
		var $ul = $("<ul>");
		
		// make a nicely formatted unordered list that contains all the assignment types
		// and their weighting
		for(var key in result.syllabus){
			var $li = $("<li>");
            var assignmentType = key;
            var assignmentWeight = result.syllabus[key];
            $li.text(assignmentType+": " + assignmentWeight + " of final grade");
            $ul.append($li);
        }

        // append the formatted syllabus (in the form of an 'ul') to the div
        ($newSyllabusDiv).append($ul);
		// alert("HERES NEWSYLABUSDIV " + $newSyllabusDiv.text());

	
		// alert("li #"+result.department+""+result.number);
		// var check2 = $("#"+result.department+""+result.number).attr('id');
		// alert("should append to " + check2);

		// append the syllabus div onto the li element 
		$("#"+result.department+result.number).append($newSyllabusDiv);

		// change the button text
		$("#viewButton"+result.department+result.number).text("Less");
	}
	
}


