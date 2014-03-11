        var donutChart = AmCharts.makeChart("testDonutDiv", {
            "type": "pie",
            "theme": "none",
            "dataProvider": [{
                "title": "Weekly assignments",
                "value": 145
            }, {
                "title": "Final assignment",
                "value": 20
            }, {
                "title": "Quizzes",
                "value": 37
            }, {
                "title": "Self-assessments",
                "value": 23
            }, {
                "title": "Lab participation",
                "value": 10
            }, {
                "title": "Studio participation",
                "value": 10
            }, {
                "title": "Class participation",
                "value": 5
            }],
            "titleField": "title",
            "valueField": "value",
            "labelRadius": 8,

            "radius": "38%",
            "innerRadius": "60%",
            "labelText": "[[title]]"
        });