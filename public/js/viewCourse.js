'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();


})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	//$('#mycoolbutton').click(viewCourse);
	$('.courseButton').click(viewCourse);
	alert("here");

}

function checkClick(e) {
	e.preventDefault();
	alert('selected button');
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
			syllabusDiv.hide();
		} else {
			syllabusDiv.show();
		}
	}
	else {
		//alert('syllabusdiv doesnt exist');

		var $newSyllabusDiv = $("<div>", {id: result.department+result.number+"syllabus"});

		//alert('created div');

		$newSyllabusDiv.attr('id',result.department+result.number+'syllabus');
		//alert("heres the syllabus: " + JSON.stringify(result.syllabus));

		//$newSyllabusDiv.text(JSON.stringify(result.syllabus));

		var $ul = $("<ul>");
		
		for(var key in result.syllabus){
			var $li = $("<li>");
            var assignmentType = key;
            var assignmentWeight = result.syllabus[key];
            $li.text(assignmentType+": " + assignmentWeight + " of final grade");
            $ul.append($li);
        }

        ($newSyllabusDiv).append($ul);
		//alert("HERES NEWSYLABUSDIV " + $newSyllabusDiv.text());

	
		//alert("li #"+result.department+""+result.number);
		var check2 = $("#"+result.department+""+result.number).attr('id');
		//alert("should append to " + check2);

		$("#"+result.department+result.number).append($newSyllabusDiv);
	}
	
}


