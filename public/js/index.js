'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	
});


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#addCourseButton').click(addCourse);
	$('.syllabusButton').click(getCourseSyllabus);
	$('.removeButton').click(removeCourse);
	$('.editButton').click(editCourse);
}

function removeCourse(e) {
	e.preventDefault();
	var courseID = $(this).closest('li').attr('id');
	var data = {};
	data["ID"] = courseID;
	//console.log(courseName);
	var check = confirm("Are you sure you want to delete this class?");
    if(check) {
    	$.post('/deleteCourseAJAX',data, callback);
    	//$.post('/editCourseAJAX',courseID,callback);

    }
	//alert('i now have the course name ' + courseID + ' and then we have to go into database and remove it');
}


function callback(e) {
	window.location.href = "/index";
}

function editCourse(e) {
	e.preventDefault();

	alert('here i would take you to the /editCourse for the course you just clicked on');
	// take you to the course/something
	// set the active tab to be syllabus settings.
}

function addCourse() {
	console.log("user clicked button");
	window.location.href = "/addACourse"; // load the page

	//$.get("/addACourse");
} 

function getCourseSyllabus(e) {
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var courseName = $(this).closest("li").attr('id');
	//alert(courseName);
	// get rid of 'project' from the front of the id 'project3'
	
	var url = "/courses/" + courseName + "/syllabus/";
	$.get(url, showCourseSyllabus);
} 

function showCourseSyllabus(result) {
	var syllabusDiv = $("#"+result.department+result.number+"syllabus");


	if(syllabusDiv.length) {
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
		var $newSyllabusDiv = $('<div>', {id: result.department+result.number+'syllabus'});

		// $newSyllabusDiv.attr('id',result.department+result.number+'syllabus');
		//alert("heres the syllabus: " + JSON.stringify(result.syllabus));

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
		//alert("HERES NEWSYLABUSDIV " + $newSyllabusDiv.text());

	
		//alert("li #"+result.department+""+result.number);
		var check2 = $("#"+result.department+""+result.number).attr('id');
		console.log("should append to " + check2);
		console.log($("#"+check2).html());

		// append the syllabus div onto the li element 
		$("#"+check2).append($newSyllabusDiv);

		// change the button text
		$("#viewButton"+result.department+result.number).text("Less");
	}
	
}

function showCourseAssignments(results) {
	var $newAssignmentsDiv = $("<div>", {id: result.department+result.number+"assignments"});

	var $table = $("<table>", {class: "table"});
	var $nameheader = $("<th>", {innerHTML: "Name"});
	var $typeheader = $("<th>", {innerHTML: "Type"});
	var $scoreheader= $("<th>", {innerHTML: "Score"});
	var $totalheader= $("<th>", {innerHTML: "Total"});

	($table).append($nameheader);
	($table).append($typeheader);
	($table).append($scoreheader);
	($table).append($totalheader);

	for(var i=0; i<result.assignments.length; i++) {
		var $tr = $("<tr>", {id: "assignment"+i})
		var currentAssignment = result.assignments[i];
		var name = currentAssignment.name;
		var type = currentAssignment.type;
		var score = currentAssignment.score;
		var total = currentAssignment.total;
		var course = currentAssignment.course;
		if(course===result.department+result.number) {
			// print it, it's for the right course in theory we should filter
			// these out before we even return 'results'
			var $tdName = $("<td>");
			$tdName.text(name);
			var $tdType = $("<td>");
			$tdType.text(type);
			var $tdScore = $("<td>");
			$tdScore.text(score);
			var $tdTotal = $("<td>");
			$tdTotal.text(total);
			($tr).append($tdName);
			($tr).append($tdType);
			($tr).append($tdScore);
			($tr).append($tdTotal);
			($table).append($tr);
		}
	}
	($newAssignmentsDiv).append($table);
	$("#"+result.department+result.number).append($newAssignmentsDiv);
}



// this method is called when chart is first inited as we listen for "dataUpdated" event
function zoomChart() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
}


// generate some random data, quite different range
function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 5);

    for (var i = 0; i < 1000; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        var visits = Math.round(Math.random() * (40 + i / 5)) + 20 + i;

        chartData.push({
            date: newDate,
            visits: visits
        });
    }
    return chartData;
}


