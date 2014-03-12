        var donutChart = AmCharts.makeChart("testDonutDiv", {
            "type": "pie",
            "theme": "none",
            "dataProvider": [{
                "title": "Psets",
                "value": 40
            }, {
                "title": "Final",
                "value": 40
            }, {
                "title": "Midterm",
                "value": 20
            }],
            "titleField": "title",
            "valueField": "value",
            "labelRadius": 8,

            "radius": "38%",
            "innerRadius": "60%",
            "labelText": "[[title]]"
        });

        var chart = AmCharts.makeChart("typeassignmentdiv", {
    "type": "serial",
    "theme": "none",
    "columnWidth:": 0.6,
    "columnSpacing": 5,
    "dataProvider": [{
        "year": "Psets",
        "income": 532,
        "expenses": 600
    }, {
        "year": "Midterm",
        "income": 258,
        "expenses": 300
    }, {
        "year": "Final",
        "income": 540,
        "expenses": 600
    }],
    "startDuration": 1,
    "graphs": [{
        "balloonText": "Actual:[[value]]",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "title": "Income",
        "type": "column",
        "valueField": "income"
    }, {
        "balloonText": "Possible:[[value]]",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "title": "Expenses",
        "type": "column",
        "valueField": "expenses"
    }],
    "rotate": false,
    "categoryField": "year",
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