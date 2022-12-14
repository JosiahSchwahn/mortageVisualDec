
google.load('visualization', '1', {
    'packages': ['geochart', 'table']
});
google.setOnLoadCallback(drawRegionsMap);

function csvToArray (csv) {
    rows = csv.split("\n");

    return rows.map(function (row) {
    	return row.split(",");
    });
};

// Hard-coded for brevity, but you can set this variable with FileReader
var csv = "the,quick,brown,fox\n" +
          "jumps,over,the,lazy,dog";

var array = csvToArray(csv);



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
        ['Region', 'State',         'LTV%' , 'Region Health (Out of 1000)', 'DTI%'],
        ['US-NY',  'New York',       95,              107,                        43],
        ['US-SC',  'South Carolina', 88,              103,                        24],
        ['US-PA',  'Pennsylvania',   72,              644,                        33],
        ['US-CO',  'Colorado',       80,              349,                        47],
        ['US-MT',  'Montana',        93,              947,                        22],
        ['US-NV',  'Nevada',         85,              330,                        19]
    ];
    

    
    // Create a DataTable object based on our data
    var data = google.visualization.arrayToDataTable(regionDataArray);

    // Create a DataView object, including only the columns we want Google to visualize
    var view = new google.visualization.DataView(data);
    view.setColumns([1, 2]);

    var geoChart = new google.visualization.GeoChart(document.getElementById('chart'));

    var options = {
        region: 'US',
        resolution: 'provinces',
        width: 700,
        height: 700,
        legend: 'none',
        colorAxis: {
            colors: ['#DD4B4B', '#FCBD68', '#F0FC68', '#20AF97']
        }
    };

    google.visualization.events.addListener(geoChart, 'regionClick', function (e) {
        
        // e.region is the region (eg. US-XX)

        // Query for which row(s) in our DataTable match this region
        var rowIdxs = data.getFilteredRows([{column: 0, value: e.region}]);

        
            var i = rowIdxs[0]; // assume only 1 row per region

            // Now you can do whatever you want with any of the data in the table!

            var stateName = data.getValue(i, 1);
            var importantInfo = data.getValue(i, 2);
            var otherData = data.getValue(i, 3);

            // Some BS output to show simple examples
            $('.info').html("<h1>"+stateName+"</h1>");
            

            $('.info').append("<div>Important Info: "+importantInfo+"</div>");
            $('.info').append("<div>Other Data: "+otherData+"</div>");
            $('.info').append("<a href='http://wikipedia.org/wiki/"+stateName+"' target='_blank'>Visit Wikipedia for "+stateName+"</a>");
           
        
    });

    geoChart.draw(view, options);

};


