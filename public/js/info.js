'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    console.log('document is ready');
    var myData;

    $.get("/getAssignments", function(data) {
        console.log(data);
        console.log('now ill try to assign');

        var chart = AmCharts.makeChart("testLine", {
            "type": "serial",
            "theme": "none",
            "marginLeft": 20,
            "pathToImages": "http://www.amcharts.com/lib/3/images/",
            "dataProvider": data,
            "valueAxes": [{
                "axisAlpha": 0,
                //"inside": true,
                "position": "left"//,
                //"ignoreAxisWidth": true
            }],
            "graphs": [{
                "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                "bullet": "round",
                "bulletSize": 6,
                "lineColor": "#d1655d",
                "lineThickness": 2,
                "negativeLineColor": "#637bb6",
                "type": "smoothedLine",
                "valueField": "score"
            },
            {
                "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
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
                "stackType": "regular",
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
                    "hidden": true,
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
});