google.load('visualization', '1', {
    'packages': ['geochart', 'table']
});
google.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    /**
     * Simple 2-dimensional array representation of our data.
     *
     *  - Region            - The region name, as passed by the viz lib to the regionClick listener
     *  - State             - Human-consumable name we'll show when the hovering on the region
     *  - Important Info    - This is the data we're interested in visualizing
     *  - Other Data        - We're not going to visualize this, but we'll query for it on click
     */
    var regionDataArray = [
        ['Region', 'State',         "LTV" , 'Region Health', 'DTI'],
        ['US-NY',  'New York',       300,          105,      101],
        ['US-SC',  'South Carolina', 300,          103,      101],
        ['US-PA',  'Pennsylvania',   600,          1024,      1091],
        ['US-CO',  'Colorado',       0,            1050,      1081],
        ['US-MT',  'Montana',        200,          1100,      1021],
        ['US-NV',  'Nevada',        200,          1100,      1021]
    ];

    // Create a DataTable object based on our data
    var data = google.visualization.arrayToDataTable(regionDataArray);

    // Create a DataView object, including only the columns we want Google to visualize
    var view = new google.visualization.DataView(data);
    view.setColumns([1, 3, 4]);

    var geoChart = new google.visualization.GeoChart(document.getElementById('chart'));

    var options = {
        region: 'US',
        resolution: 'provinces',
        width: 600,
        height: 400,
        /*legend: 'none',*/
        colorAxis: {
            colors: ['#DD4B4B', '#FCBD68', '#F0FC68', '#20AF97']
        }
    };

    google.visualization.events.addListener(geoChart, 'regionClick', function (e) {
        $('#info').hide()
        // e.region is the region (eg. US-XX)

        // Query for which row(s) in our DataTable match this region
        var rowIdxs = data.getFilteredRows([{column: 0, value: e.region}]);

        if ((rowIdxs.length > 0)) {
            var i = rowIdxs[0]; // assume only 1 row per region

            // Now you can do whatever you want with any of the data in the table!

            var stateName = data.getValue(i, 1);
            var importantInfo = data.getValue(i, 2);
            var otherData = data.getValue(i, 3);
            var loanToValue = data.getValue(i, 4);
            var otherData3 = data.getValue(i, 5);

            // Some BS output to show simple examples
            $('#info').html("<h1>"+stateName+"</h1>");
            $('#info').append("<span> Region Health: "+importantInfo+"</span><br />");
            $('#info').append("<span>Other Data: "+otherData+"</span><br />");
            $('#info').append("<span>Loan to Value: "+ loanToValue+"</span><br />");
            $('#info').append("<a href='http://wikipedia.org/wiki/"+stateName+"' target='_blank'>Visit Wikipedia for "+stateName+"</a>");
            $('#info').fadeIn(500)
        } else {
            console.log("No data for this Region")
        }
    });

    geoChart.draw(view, options);

};