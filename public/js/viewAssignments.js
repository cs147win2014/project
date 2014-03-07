'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
    makeCharts();
});

function makeCharts() {
    $.get("/getAssignments", function(data) {
        //console.log(data);
        //console.log('now ill try to assign');


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

    //for google analytics

    /*$(".active").click(function (e) {
        ga("send", "event", "tabSwitched", "click");
    });*/

    //end stuff for google analytics
    
    //editable stuff
    $.fn.editable.defaults.mode = 'inline';

    $('.weightNumber').editable();

    //make type editable
    $('.typeName').editable({
        title: 'Type'
    });



	//$('#typeSelect').hide();
    //$('#courseSelect').on('change', function(event) {
        //$('#typeSelect').show();
    //});

    $('#addAssignmentBtn').click(addAssignment);
    $('#backBtn').click(goBack);
    $('#actualProgressTab').click(makeCharts);

    $('#myTab a').click(function (e) {
  		e.preventDefault()
  		$(this).tab('show')
	});

    $("#addSyllabusTypeBtn").click(function(e) {
        e.preventDefault();
        var rowText = '<tr id="tableEntry"></tr>';
        var typeText = '<td><a href="#" class = "typeName" data-type="wysihtml5" data-pk="1" data-title="Type">new type</a></td>';
        var weightText = '<td><a href="#" class = "weightNumber" data-type="wysihtml5" data-pk="1" data-url="/post" data-title="Weighting">new weighting</a></td>';
    
        var typeTd = $(typeText);
        var weightTd = $(weightText);

        typeTd.editable();
        weightTd.editable();

        var newRow = $(rowText);
        newRow.append(typeTd);
        newRow.append(weightTd);

        $("#syllabusTable").append(newRow);

        console.log('i appended');

    });
	
	var next = 1;
    $(".add-more").click(function(e){
        e.preventDefault();
        // the div element selectors
        var addto = "#field" + next;
        var addRemove = "#field" + (next);

        next = next + 1;
        $("#numFields").attr("value", next);
        //console.log("just added, " + next);

        var newIn = '<div id="field' + next + '" class="col-xs-9 col-md-4"><br>' + 
                        '<div class="row">' + 
                            '<div class="col-md-6 col-xs-6">' + 
                                '<input autocomplete="off" placeholder="Ex: Homework" class="form-control col-xs-4 col-md-4" name="type' + next + '" type="text"></div>' + 
                            '<div class="col-md-6 col-xs-6">' + 
                                '<input autocomplete="off" placeholder="Ex: 25" class="form-control col-xs-4 col-md-4" name="weighting' + next + '" type="text"></div></div>' + 
                    '</div>';
        var newInput = $(newIn);

        var removeBtn = '<div id="remove' + (next - 1) + '" class="col-xs-3 col-md-4 removeButton"><br><button class="btn btn-danger remove-me" ><i class="glyphicon glyphicon-minus"></i></button></div></div><div id="field" class="input-append row">';
        var removeButton = $(removeBtn);

        $(addto).after(newInput);
        $(addRemove).after(removeButton);
        $("#field" + next).attr('data-source',$(addto).attr('data-source'));
        $("#count").val(next);  
        
        $('.remove-me').click(function(e){
            //alert('clicked!');
            e.preventDefault();
            var $divToRemove = $(this).closest('div'); //.find(".disabled");
            var fieldNum = ($divToRemove).attr('id').charAt(($divToRemove).attr('id').length-1);
            var fieldID = "#field" + fieldNum;
            ($divToRemove).remove();
            $(fieldID).remove();
            //next = next-1;
            //$("#numFields").attr("value", next--);
            //console.log('just deleted, ' + next);
        });
    });
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
