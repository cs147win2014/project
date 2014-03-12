'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
});


function initializePage() {
    //alert('loading page');

    $('#courseSelect').on('change', showTypeSelectElement);
    $('#backBtn').click(goBack);
    $('#addAssignmentBtn').click(addAssignment);
    $("#helpBtn").click(showHelp);    

    if($('#typeSelectDiv').is(":visible")) {
    	//alert('its visible course known');
        // get course name, select it by default.
        //alert($("body").attr("value"));
        var courseID = $("body").attr("value");
        //alert(courseID);
        $("#courseSelect option#"+courseID).attr('selected', 'selected');

        var url = "/courses/" + courseID + "/syllabus";
        //alert(url);
        $.get(url, populateTypeSelect);
    } else {
        alert('not visible, course not known');
    }
}


function showHelp(e) {
    e.preventDefault();
    alert('Can\'t submit the assignment without the assignment types! Add some assignment types to the syllabus, then try again.');
}



function showTypeSelectElement(e) {
    //alert('i got here');
    var elemId = $(this).attr('id');
    //alert(elemId);
    var selectedCourse = $("#"+elemId+" option:selected").attr('value');
    //alert(selectedCourse);
    // now go into the database and get the syllabus types for the class
    // then show a typeSelect element that is populated with all of those syllabus types
    //$.get('/getAssignmentTypes',populateTypeSelect);
    //alert("GONNA CALL GET FUNCTION");
    var url = "/courses/" + selectedCourse + "/syllabus";
    $.get(url, populateTypeSelect);
    $('#typeSelectDiv').show();
}



function populateTypeSelect(syllabus) {
    //alert('im gonna populate the types now');
    //alert(syllabus);
    var $selectElement = $('#typeSelect');
    //alert($selectElement);
    $selectElement.text("");
    // we need to get the courseID so we can make the value the courseID...
    var optionHTML = '<option value="1"></option>'; 
    var optionElement = $(optionHTML);
    $selectElement.append(optionElement);

    for(var elem = 0; elem < syllabus.length; elem++) {
        optionHTML = '<option value="' + syllabus[elem]._id + '">' + syllabus[elem].name + '</option>';
        optionElement = $(optionHTML);
        $selectElement.append(optionElement);
    }
    if(syllabus.length===0) {
        $("#submitAssignmentBtn").click("disabled","true");
    }
}


function submitAssignmentForm(e) {
    e.preventDefault();
    // get all the values of all the inputs.
    var $allInputs = $('div#field input.form-control');
    console.log($allInputs.length);
    console.log($allInputs[0]);
    var data = {};

    for(var i=0; i<$allInputs.length; i++) {
        var name = $($allInputs[i]).attr('name');
        var val = $($allInputs[i]).val();
        data[name] = val;
    }
    
    console.log(data);

    $.post('/editCourseAJAX',data,callback);
}



function addAssignment() {
	console.log("user clicked add assignment button");
    var courseID = $(this).closest('div').attr('id');
    console.log(courseID);
	window.location.href = "/addAssignment/" + courseID; // load the page

	//$.get("/addACourse");
}



function goBack(e) {
    e.preventDefault();
    window.location.href = "javascript:history.back();";
}
