'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
    
});

function initializePage() {
    var courseID = $("body > div").attr('id');
    console.log(courseID);
    makeCharts(courseID);
    //for google analytics

    /*$(".active").click(function (e) {
        ga("send", "event", "tabSwitched", "click");
    });*/

    //end stuff for google analytics
    
    //editable stuff
    $.fn.editable.defaults.mode = 'popup';
    //$.fn.editable.defaults.success = checkResponse;

        //checkResponse;

    //make type editable
    $('.typeName').editable({
        ajaxOptions: {
            type: 'put'
        },
        defaultValue: courseID,
        name: 'type',
        send: 'always',  
        success: checkTypeResponse,
        type: 'text',
        title: 'Enter type',
        pk: 1,
        url: '/post'
    });

    $('.weightNumber').editable({
        ajaxOptions: {
            type: 'put'
        },
        defaultValue: courseID,
        name: 'weightNum',
        send: 'always',
        success: checkWeightResponse,
        type: 'text',   
        title: 'Enter weight',
        pk: 2,
        url: '/post'       
    });

    //ajax emulation
    /*$.ajax({
        url: '/post',
        responseTime: 200,
        response: function(settings) {
            alert(JSON.stringify(settings));
        }
    }).done(function(e) {
        console.log('hello i finished teh ajax request');
    }); */

    $('#submitBtn').click(submitAssignmentForm);
    
    $('button.showUpOnActivePane').click(addAssignment);
    $('#backBtn').click(goBack);
    
    $('.remakeChartsOnClick').click(makeCharts(courseID));

    $('#myTab a').click(function (e) {
  		e.preventDefault()
  		$(this).tab('show');
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
                                '<input autocomplete="off" placeholder="Ex: Homework" class="form-control col-xs-4 col-md-4" name="type' + next + '" type="text" autofocus></div>' + 
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
        console.log('got here');
        
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

function checkTypeResponse(results) {
    console.log('hey it got back to the client sideTYPEYPTTYPETYPETYPETYP');
    console.log(results);
}

function checkWeightResponse(results) {
    console.log('hey it got back to the client sideWEIGHTWIEGHWETIWGHEIWTHEIWGHEIWT');
    console.log(results);
}

function addAssignment() {
    console.log("user clicked add assignment button");
    var courseID = $(this).closest('div').attr('name');
    alert(courseID);
    console.log(courseID);
    window.location.href = "/addAssignment/" + courseID; // load the page

    //$.get("/addACourse");
}

function goBack(e) {
    e.preventDefault();
    window.location.href = "javascript:history.back();";
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
    console.log("calling AJAX NOW!");
    $.post('/editCourseAJAX',data,callback);
}

function callback(results) {
    console.log('i made it back!');
    console.log('here are the results: ' + results);

    var courseID = $("body > div").attr('id');
    var department = results.department;
    var number = results.number;
    var syllabus = results.syllabus;
    for(var key in syllabus) {
        //now we should add a tr.
        var tdText = '<tr class="tableEntry">' + 
                        '<td class="row"><a href="#" id="' + key + '" data-url = "/post" class = "editable editable-click editable-unsaved typeName col-md-4">' + key + '</a></td>' +
                        '<td><a href="#" id="' + key + 'Weight" data-url = "/post" class = "weightNumber col-md-4 editable editable-click editable-unsaved">' + syllabus[key] + '</a></td>' +
                    '</tr>';

        var tdElement = $(tdText);
        tdElement.editable({
            ajaxOptions: {
                type: 'put'
            },
            defaultValue: courseID,
            name: 'type',
            send: 'always',  
            success: checkTypeResponse,
            type: 'text',
            title: 'Enter type',
            pk: 1,
            url: '/post'
        });
        $("#syllabusTable").append(tdElement);
    }
    
    $("#successMessageDiv").text("Success!");
    // now display everything. so on the server side you want to make sure you remove all duplicates
    // so basically 'results' should only be what the server doesn't already contain
    // like you should change everything that isn't already the same as what's on the servers.
}

function makeCharts(courseID) {
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

    $.get('/courses/'+courseID+'/syllabus',function(data){
        if(data.length==0) {
            $("#testDonutDiv").hide();
            return;
        }
        var donutData = [];
        var i = 0;
        for(var index in data) {
            var item = data[index];
            //console.log(JSON.stringify(item));
            donutData[i] = {"title":item["name"], "value":item["weighting"]};
            //console.log(item["name"] + " with weighting " + item["weighting"]);
            i++;
        }
        //console.log(data);
        //console.log(JSON.stringify(donutData));

        var donutChart = AmCharts.makeChart("testDonutDiv", {
            "type": "pie",
            "theme": "none",
            "dataProvider": donutData,
            /*[{
                "title": "New",
                "value": 4852
            }, {
                "title": "Returning",
                "value": 9899
            }],*/
            "titleField": "title",
            "valueField": "value",
            "labelRadius": 5,

            "radius": "42%",
            "innerRadius": "60%",
            "labelText": "[[title]]"
        });
    });

    $.get('/courses/'+courseID+'/assignments',function(data){
        if(data.length==0) {
            $("#testAssignDiv").hide();
            return;
        }
        var assignData = [];
        var i = 0;
        for(var index in data) {
            var item = data[index];
            console.log(JSON.stringify(item));
            assignData[i] = {"title":item["name"], "value":item["percent"]};
            console.log(item["name"] + " with score " + item["percent"]);
            i++;
        }
        console.log(data);
        console.log(JSON.stringify(assignData));

        var lineChart = AmCharts.makeChart("testAssignDiv", {
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
            "dataProvider": assignData,
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
                    "valueField": "value"
                },
                
            ],
            "chartScrollbar": {},
            "chartCursor": {
                "cursorAlpha": 0,
                "cursorPosition": "mouse"
            },
            "categoryField": "title",
            "categoryAxis": {
                "startOnAxis": true,
                "minorGridAlpha": 0.1,
                "minorGridEnabled": true
            }
        });
    });
}