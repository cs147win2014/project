'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
    makeCharts();
});

function makeCharts() {
    $.get("/getAssignments", function(data) {
        console.log(data);
        console.log('now ill try to assign');


        var chart = AmCharts.makeChart("testLine", {
            "type": "serial",
            "theme": "none",
            "marginLeft": 20,
            "pathToImages": "http://www.amcharts.com/lib/3/images/",
            "legend": {
                "equalWidths": false,
                "periodValueText": "total: [[value.sum]]",
                "position": "top",
                "valueAlign": "left",
                "valueWidth": 100
            },
            "dataProvider": data,
            "valueAxes": [{
                "axisAlpha": 0,
                //"inside": true,
                "position": "left",//,
                //"ignoreAxisWidth": true
                "title": "All Assignments"
            }],
            "graphs": [
                {
                    //"balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                    "bullet": "round",
                    "bulletSize": 6,
                    "lineColor": "#99C2FF",
                    "lineThickness": 2,
                    "negativeLineColor": "#637bb6",
                    "type": "smoothedLine",
                    "valueField": "score"
                },
                {
                    //"balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                    "bullet": "round",
                    "bulletSize": 6,
                    "lineColor": "#d1655d",
                    "lineThickness": 2,
                    "negativeLineColor": "#637bb6",
                    "type": "smoothedLine",
                    "valueField": "total"
                }
            ],
            "chartScrollbar": {},
            "chartCursor": {
                "categoryBalloonDateFormat": "YYYY",
                "cursorAlpha": 0,
                "cursorPosition": "mouse"
            },
            "categoryField": "name",
            "categoryAxis": {
                "startOnAxis": true,
                "minorGridAlpha": 0.1,
                "minorGridEnabled": true
            }
        });
        

        var allAssignmentsChart = AmCharts.makeChart("allAssignmentsChartDiv", {
            "type": "serial",
            "theme": "none",
            "pathToImages": "http://www.amcharts.com/lib/3/images/",
            "legend": {
                "equalWidths": false,
                "periodValueText": "total: [[value.sum]]",
                "position": "top",
                "valueAlign": "left",
                "valueWidth": 100
            },

            "dataProvider": data,

            "valueAxes": [{
                //"stackType": "regular",
                "gridAlpha": 0.07,
                "position": "left",
                "title": "Test plot! :D"
            }],

            "graphs": [
                {
                    "fillAlphas": 0.6,
                    "lineAlpha": 0.4,
                    "title": "Your score",
                    "valueField": "score"
                }, 
                {
                    "fillAlphas": 0.6,
                    //"hidden": true,
                    "lineAlpha": 0.4,
                    "title": "Possible score",
                    "valueField": "total"
                }
            ],

            "plotAreaBorderAlpha": 0,
            "marginTop": 10,
            "marginLeft": 0,
            "marginBottom": 0,
            "chartScrollbar": {},
            "chartCursor": {
                "cursorAlpha": 0
            },
            "categoryField": "name",
            "categoryAxis": {
                "startOnAxis": true,
                "axisColor": "#DADADA",
                "gridAlpha": 0.07
            },
            "exportConfig": {
                "menuTop": "10px",
                "menuRight": "10px",
                "menuItems": [{
                    "icon": 'http://www.amcharts.com/lib/3/images/car.png',
                    "format": 'png'
                }]
            }
        });
    });
}

function initializePage() {
    alert('loading page');

    $('#courseSelect').on('change', showTypeSelectElement);
    $('#backBtn').click(goBack);
    $('#addAssignmentBtn').click(addAssignment);
    $("#helpBtn").click(showHelp);    

    if($('#typeSelectDiv').is(":visible")) {
    	alert('its visible course known');
        // get course name, select it by default.
        alert($("body").attr("value"));
        var courseID = $("body").attr("value");

        $("#courseSelect option#"+courseID).attr('selected', 'selected');

        var url = "/courses/" + selectedCourse + "/syllabus/";
        $.get(url, populateTypeSelect);
    }
    else {
        alert('not visible, course not known');
    }
    
    
}

function showHelp(e) {
    e.preventDefault();
    alert('If you have no types, go to the course page and edit the syllabus!');
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
    var url = "/courses/" + selectedCourse + "/syllabus/";
    $.get(url, populateTypeSelect);
    $('#typeSelectDiv').show();
    
}

function populateTypeSelect(syllabus) {
    alert('im gonna populate the types now');
    var $selectElement = $('#typeSelect');
    $selectElement.text("");
    // we need to get the courseID so we can make the value the courseID...
    var optionHTML = '<option value="1"></option>'; 
    var optionElement = $(optionHTML);
    $selectElement.append(optionElement);

    for(var key in syllabus) {
        optionHTML = '<option value="' + key.name + '">' + key.name + '</option>';
        optionElement = $(optionHTML);
        $selectElement.append(optionElement);
    }
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
