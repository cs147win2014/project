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


function removeAssignment(e) {
    e.preventDefault();
    var assignID = $(this).closest('tr').attr('id');
    var data = {};
    data["ID"] = assignID;
    //console.log(assignID);
    //console.log(courseName);
    var check = confirm("Are you sure you want to delete this assignment?");
    if(check) {
        $.post('/deleteAssignmentAJAX',data, function(e) {
            $('#' + assignID).remove();
            //window.location.href = "/index";
        });
        //$.post('/editCourseAJAX',courseID,callback);

    }
    //alert('i now have the course name ' + courseID + ' and then we have to go into database and remove it');
}



function initializePage() {
    $('.typeRemoveButton').click(removeType);
    $('.assignRemoveButton').click(removeAssignment);
    var courseID = $("body > div").attr('id');
    
    makeCharts(courseID);
    
    //$('[class="active"').click(alert('i fucking clicked this')); //makeCharts(courseID));
    $(".remakeChartsOnClick").click(function(e) {
        e.preventDefault(e);
        makeCharts(courseID);
    });
    
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
                                '<input autocomplete="off" placeholder="Ex: Homework" class="form-control col-xs-4 col-md-4 typeInput" name="type' + next + '" type="text" autofocus>' + 
                            '</div>' + 
                            '<div class="col-md-6 col-xs-6">' + 
                                '<input autocomplete="off" placeholder="Ex: 25" class="form-control col-xs-4 col-md-4 weightInput" name="weighting' + next + '" type="text">' + 
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
        // console.log('got here');
        
        $('.remove-me').click(function(e){
            //alert('clicked!');
            e.preventDefault();
            var $divToRemove = $(this).closest('div'); //.find(".disabled");
            var fieldNum = ($divToRemove).attr('id').charAt(($divToRemove).attr('id').length-1);
            var fieldID = "#field" + fieldNum;
            ($divToRemove).remove();
            $(fieldID).remove();

        });
    });	
}

function checkTypeResponse(results) {
    // console.log('hey it got back to the client sideTYPEYPTTYPETYPETYPETYP');
    // console.log(results);
    // var courseID = $("body>div").attr('id');
    // makeCharts(courseID);
}

function checkWeightResponse(results) {
    // console.log('hey it got back to the client sideWEIGHTWIEGHWETIWGHEIWTHEIWGHEIWT');
    // console.log(results);
    // var courseID = $("body>div").attr('id');
    // makeCharts(courseID);
}

function addAssignment() {
    // console.log("user clicked add assignment button");
    var courseID = $(this).closest('div').attr('name');
    
    // console.log(courseID);
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
    // console.log($allInputs.length);
    // console.log($allInputs[0]);
    var data = {};

    for(var i=0; i<$allInputs.length; i++) {
        var name = $($allInputs[i]).attr('name');
        var val = $($allInputs[i]).val();
        data[name] = val;
    }
    data["courseId"] = $("body > div").attr('id');
    
    // console.log(data);
    // console.log("calling AJAX NOW!");
    $.post('/editCourseAJAX',data,callback);
}

function callback(results) {
    // console.log('i made it back!');
    // console.log('here are the results: ');
    // console.log(results);
    // console.log(results["syllabus"]);

    var courseID = $("body > div").attr('id');
    var department = results.department;
    var number = results.number;
    var syllabus = results.syllabus;
    for(var key in syllabus) {
        // console.log('this is the syllabus id: ' + key);
        
        // now we should add a tr.
        var trText = '<tr class="tableEntry" id="' + key + '"></tr>';
        var trElement = $(trText); 
        var tdTypeText = '<td class="row"><a href="#" id="' + syllabus[key].name + '" data-url = "/post" data-params="' + key + '" class = "editable editable-click editable-unsaved typeName col-md-4">' + syllabus[key].name + '</a></td>';
        var tdType = $(tdTypeText);
        var tdWeightText = '<td><a href="#" id="' + syllabus[key].name + 'Weight" data-url = "/post" data-params="' + key + '" class = "weightNumber col-md-4 editable editable-click editable-unsaved">' + syllabus[key].weighting + '</a></td>';
        var tdWeight = $(tdWeightText);
        var divButtonText = '<td><div class="btn-group"></div></td>';
        var myButtonText = '<button type="button" id="removeButton' + key + '" class="btn typeRemoveButton btn-xs btn-default "><span class="glyphicon glyphicon-trash"></span></button>'
        var divButton = $(divButtonText);
        var myButton = $(myButtonText);
        divButton.append(myButton);
        myButton.click(removeType);

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
        // console.log('appended type');
        trElement.append(tdWeight);
        //console.log("appended weight");
        trElement.append(divButton);
        //console.log("appended button");
        // console.log("appended weight");

        $("#syllabusTable").append(trElement);
        // console.log('appended to table');
    }
    
    //here i wanna delete all the divs and reset them.
    $('.remove-me').click();
    // now you have one input left, reset the value to null
    $('.typeInput').val("");
    $('.weightInput').val("");
    // tell user it worked!
    $("#successMessageDiv").text("Success!");
    
}

function makeCharts(courseID) {
    //console.log("making the charts!!!");

    // first get the assignments from the database
    $.get("/getAssignments/" + courseID, function(data) {
        // console.log(data);
        // console.log('now ill try to assign');
        
        var chartDivs = [];
        var clusterChartData = [];
        
        var counter = 0;
        for(var type in data) {
            // console.log('heres a thing i ndata');
            // console.log(type);
            // console.log('try get the ID now');
            // console.log($('#'+type+'breakdownChart').attr('id'));

            var clusterChartVal = {};
            clusterChartVal["type"] = type;
            clusterChartVal["actual"] = 0;
            clusterChartVal["possible"] = 0;

            for(var item in data[type]) {
                //console.log('clustercharts stuff:');
                //console.log(data[type][item]);
                clusterChartVal["actual"] += data[type][item].score;
                clusterChartVal["possible"] += data[type][item].total;
            }
            clusterChartVal["percent"] = clusterChartVal["actual"]/clusterChartVal["possible"];

            clusterChartData[counter] = clusterChartVal;

            

            if(data[type].length==0) {
                //$('#'+type+"breakdownChart").hide();
                // console.log("hiding" + type+"chartTitle")
                //$('#'+type+"chartTitle").hide();
                $('#'+type+"breakdownChart").parent().hide();
            }
            
            else {
                $('#'+type+"chartTitle h3").text(type + " overall score: " + (clusterChartVal["percent"]*100).toString().substr(0,5) + "%");
                

                //var h3text = "<h3>" + type + " cumulative score: " + clusterChartVal["percent"]*100 + "%</h3>";
                //var h3 = $(h3text);   
                //console.log(type + " cumulative score: " + clusterChartVal["percent"]*100 + "%");
                //console.log($('#'+chartdivID).closest('div.chartDescriptionDiv'));

                //chartDesc.append(h3);


                chartDivs[counter] = AmCharts.makeChart(type+"breakdownChart", {
                    "type": "serial",
                    "theme": "none",
                    "marginLeft": 20,
                    "pathToImages": "http://www.amcharts.com/lib/3/images/",
                    "legend": {
                        "equalWidths": false,
                        "periodValueText": "Total: [[value.sum]]",
                        "position": "top",
                        "valueAlign": "left",
                        "valueWidth": 100
                    },
                    "dataProvider": data[type],
                    "valueAxes": [{
                        "minimum": 0,
                        "maximum": "[[value.sum]]",
                        "axisAlpha": 0,
                        //"inside": true,
                        "position": "left",//,
                        //"ignoreAxisWidth": true
                        "title": "Total Points"
                    }],
                    "graphs": [
                        {
                            "balloonText": "Your Points: <b><span style='font-size:11px;'>[[value]]</span></b>",
                            "bullet": "round",
                            "bulletSize": 6,
                            "lineColor": "#99C2FF",
                            "lineThickness": 2,
                            "negativeLineColor": "#637bb6",
                            "type": "smoothedLine",
                            "valueField": "score"
                        },
                        {
                            "balloonText": "Possible Points: <b><span style='font-size:11px;'>[[value]]</span></b>",
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

                counter++;
                //console.log('clustercharts stuff:');
                console.log(clusterChartData);
            }
        }

        var clusterChart = AmCharts.makeChart("clusterChartDiv", {
            "type": "serial",
            "theme": "none",
            "columnWidth:": 0.6,
            "columnSpacing": 5,
            "legend": {
                "equalWidths": false,
                "periodValueText": "Total: [[value.sum]]",
                "position": "top",
                "valueAlign": "left",
                "valueWidth": 100
            },
            "dataProvider": clusterChartData,
            "valueAxes": [{
                "minimum": 0
            }],
            "startDuration": 1,
            "graphs": [{
                "balloonText": "Actual:[[value]]",
                "fillAlphas": 0.8,
                "lineAlpha": 0.2,
                "title": "Actual",
                "type": "column",
                "valueField": "actual"
            }, {
                "balloonText": "Possible:[[value]]",
                "fillAlphas": 0.8,
                "lineAlpha": 0.2,
                "title": "Possible",
                "type": "column",
                "valueField": "possible"
            }],
            "rotate": false,
            "categoryField": "type",
            "categoryAxis": {
                "gridPosition": "start",
                "position": "left"
            },
            "exportConfig":{
                "menuBottom":"20px",
                "menuRight":"20px",
                "menuItems": [{
                "icon": '/lib/3/images/export.png',
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