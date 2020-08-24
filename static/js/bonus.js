//Gauge Chart
//Grab values from the data json object to build the chart
function bonus(sample) {
  var url = `data/samples.json`;
  d3.json(url).then(function (sampleData) {
    
    console.log(sample)
    // //save arrays
    var setPlots = sampleData.metadata;
    //   // console.log(setPlots);
    var filteredsetPlots = setPlots.filter(plotUnit => plotUnit.id == sample)[0];
      // console.log(filteredsetPlots)

    var wfreq = filteredsetPlots.wfreq;
    
    //Create Gauge Chart
          var data3 = [
            {
                type: "indicator",
                domain: { x: [0, 1], y: [0, 1]},
                value: wfreq,
                mode: "gauge+number",
                title: { text: "Belly Button Washing Frequency <br>Scrubs per Week" },                  
                gauge: {
                    axis: { range: [0, 9], tickwidth: 1, tickcolor: "black" },
                    // bar: { color: "darkblue"},
                    // bgcolor: "yellow",
                    borderwidth: 2, 
                    bordercolor: "green",       
                    steps: [
                      { range: [0, 9], color: "red"},
                      { range: [6, 8], color: "yellow"}
                    ],
                    threshold: {
                      line: { color: "black", width: 4 },
                      thickness: 2,
                      value: wfreq
                }
              },
            }
        ];

        var layout3 = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 }
            // font: { color: "darkblue", family: "Arial"}
        };

        // let GAUGE = document.getElementById("gauge");
        
        Plotly.newPlot("gauge", data3, layout3);
  });
}