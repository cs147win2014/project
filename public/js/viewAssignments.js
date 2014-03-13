'use strict';

// Call this function when the page loads (the "ready" event)

var next;
$(document).ready(function() {
    initializePage();
    
});


function removeType(e) {
    e.preventDefault();
    var typeID = $(this).closest('tr').attr('id');
    var data = {};
    data["ID"] = typeID;
    //console.log(courseName);
    var check = confirm("Are you sure you want to delete this type?");
    if(check) {
        $.post('/deleteTypeAJAX',data, function(e) {
            $('#' + typeID).remove();
            //window.location.href = "/index";
        });
        //$.post('/editCourseAJAX',courseID,callback);

    }
    //alert('i now have the course name ' + courseID + ' and then we have to go into database and remove it');
}



function initializePage() {
    $('.removeButton').click(removeType);
    var courseID = $("body > div").attr('id');
    console.log('initializing page');
    makeCharts(courseID);
    console.log('made charts for first time');
    //$('[class="active"').click(alert('i fucking clicked this')); //makeCharts(courseID));
    $(".remakeChartsOnClick").click(function(e) {
        e.preventDefault(e);
        makeCharts(courseID);
    });
    console.log('set click listener');
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
        
        name: 'name',
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
        
        name: 'weighting',
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


    next = 1;
    $(".add-more").click(function(e){
        e.preventDefault();
        // the div element selectors
        var addto = "#field" + next;
        var addRemove = "#field" + (next);

        next = next + 1;
        $("#numFields").attr("value", next);
        //console.log("just added, " + next);

        var newIn = '<div id="field' + next + '" class="col-xs-9 col-md-4 syllabusDataDiv"><br>' + 
                        '<div class="row">' + 
                            '<div class="col-md-6 col-xs-6">' + 
                                '<input autocomplete="off" placeholder="Ex: Homework" class="form-control col-xs-4 col-md-4" name="type' + next + '" type="text" autofocus>' + 
                            '</div>' + 
                            '<div class="col-md-6 col-xs-6">' + 
                                '<input autocomplete="off" placeholder="Ex: 25" class="form-control col-xs-4 col-md-4" name="weighting' + next + '" type="text">' + 
                            '</div>' + 
                        '</div>' + 
                    '</div>';
        var newInput = $(newIn);

        var removeBtn = '<div id="remove' + (next - 1) + '" class="col-xs-3 col-md-4 removeButton"><br>' + 
                            '<button class="btn btn-danger remove-me" >' + 
                                '<i class="glyphicon glyphicon-minus"></i>' + 
                            '</button>' + 
                        '</div>' + 
                    '</div><div class="input-append row extraFormatDiv">';
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
    var courseID = $("body>div").attr('id');
    //makeCharts(courseID);
}

function checkWeightResponse(results) {
    console.log('hey it got back to the client sideWEIGHTWIEGHWETIWGHEIWTHEIWGHEIWT');
    console.log(results);
    var courseID = $("body>div").attr('id');
    //makeCharts(courseID);
}

function addAssignment() {
    console.log("user clicked add assignment button");
    var courseID = $(this).closest('div').attr('name');
    //alert(courseID);
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
    data["courseId"] = $("body > div").attr('id');
    
    console.log(data);
    console.log("calling AJAX NOW!");
    $.post('/editCourseAJAX',data,callback);
}

function callback(results) {
    console.log('i made it back!');
    console.log('here are the results: ');
    console.log(results);
    console.log(results["syllabus"]);

    var courseID = $("body > div").attr('id');
    var department = results.department;
    var number = results.number;
    var syllabus = results.syllabus;
    for(var key in syllabus) {
        console.log('this is the syllabus id: ' + key);
        //now we should add a tr.
        var trText = '<tr class="tableEntry" id="' + key + '"></tr>';
        var trElement = $(trText); 
        var tdTypeText = '<td class="row"><a href="#" id="' + syllabus[key].name + '" data-url = "/post" data-params="' + key + '" class = "editable editable-click editable-unsaved typeName col-md-4">' + syllabus[key].name + '</a></td>';
        var tdType = $(tdTypeText);
        var tdWeightText = '<td><a href="#" id="' + syllabus[key].name + 'Weight" data-url = "/post" data-params="' + key + '" class = "weightNumber col-md-4 editable editable-click editable-unsaved">' + syllabus[key].weighting + '</a></td>';
        var tdWeight = $(tdWeight);
        

        tdType.editable({
            ajaxOptions: {
                type: 'put'
            },
            
            name: 'name',
            send: 'always',  
            success: checkTypeResponse,
            type: 'text',
            title: 'Enter type',
            pk: 1,
            url: '/post'
        });

        tdWeight.editable({
            ajaxOptions: {
                type: 'put'
            },
            
            name: 'weighting',
            send: 'always',
            success: checkWeightResponse,
            type: 'text',   
            title: 'Enter weight',
            pk: 2,
            url: '/post'       
        });

        trElement.append(tdType);
        trElement.append(tdWeight);

        $("#syllabusTable").append(trElement);
        console.log('appended to table');
    }
    
    //here i wanna delete all the divs and reset them.
    

    $("#successMessageDiv").text("Success!");
    
}

function makeCharts(courseID) {
    console.log("making the charts!!!");

    $.get("/getAssignments/" + courseID, function(data) {
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
                "axisAlpha": 0,
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
}