
function buildMetadata(sample) {
  //build url
  var url = `data/samples.json`;

  //get json output with d3 and build panel
  d3.json(url).then(function (data) {
    var metaData = data.metadata;
    // console.log(metaData);

    var filteredMetaData = metaData.filter(metadataUnit => metadataUnit.id == sample)[0];

    //     Clear existing metadata
    d3.select("#sample-metadata").html("");

    // Add a line for each metadata pair
    Object.entries(filteredMetaData).forEach(([key, value]) => {
      d3.select("#sample-metadata")
        //append a paragraph tag
        .append("p").text(`${key}: ${value}`);

    });
  })
}

//Grab values from the data json object to build plots
function buildPlots(sample) {
  var url = `data/samples.json`;
  d3.json(url).then(function (sampleData) {

    //save arrays
    var setPlots = sampleData.samples;
    var filteredsetPlots = setPlots.filter(plotUnit => plotUnit.id == sample)[0];
    // console.log(filteredsetPlots)

    var otu_ids = filteredsetPlots.otu_ids;
    var sample_values = filteredsetPlots.sample_values;
    var otu_labels = filteredsetPlots.otu_labels;
 
    //slice for top ten of each
    var otu_ids_10 = otu_ids.slice(0, 10);
    var sample_values_10 = sample_values.slice(0, 10);
    var otu_labels_10 = otu_labels.slice(0, 10);

    //Create the Bar Plot 
    var trace = {
      type: "bar",
      x: sample_values_10.reverse(),
      y: otu_ids_10.map(otu_ids => `OTU ${otu_ids}`).reverse(),
      text: otu_labels_10.reverse(),
      marker: {
        color: "rgb(42, 7, 143)",
      },
      orientation: "h"
    };

    var data = [trace];

    var layout = {
      title: "Bar Chart: Top 10 OTU_Samples",
      titlefont: {
        size: 18,
        color: 'rgb(230, 59, 21)'
      },
      showlegend: false,
      xaxis: { trickangle: -45 },
      yaxis: {
        zeroline: false,
        gridwidth: 2
      },
      bargap: 2,
      width: 500,
      height: 400
    }

    Plotly.newPlot("bar", data, layout);

    //Create the Bubble Chart
    var trace1 = {
      type: "bubble",
      x: otu_ids_10,
      y: sample_values_10,
      mode: "markers",
      marker: {
        size: sample_values_10,
        color: otu_ids_10
      },
      text: otu_labels_10
    };

    var data1 = [trace1];

    var layout1 = {
      title: "Bubble Chart: Top 10 OTU_Samples",
      x: "OTU ID",
      titlefont: {
        size: 18,
        color: 'rgb(230, 59, 21)'
      },
      pointStyle: "circle"
    }

    Plotly.newPlot("bubble", data1, layout1);

    // Pie Chart
    var trace2 = {
      type: "pie",
      values: sample_values_10,
      labels: otu_ids_10,
      hovertext: otu_labels_10,
    };

    var data2 = [trace2];


    var layout2 = {
      title: "Pie Chart: Top 10 OTU_Samples",
      titlefont: {
        size: 18,
        color: 'rgb(230, 59, 21)'
      },
      width: 800,
      height: 500
    }

    Plotly.newPlot("pie", data2, layout2);

  });

};

//function to initiate plots
function init() {
  // Grab a reference to the dropdown select element
  var dropdown = d3.select("#selDataset");

  var url = `data/samples.json`;
  d3.json(url).then(function (sampleNames) {
    var sampleNames = sampleNames.names;
    sampleNames.forEach((sample) => {
      dropdown
        .append("option")
        .text(sample)
        .property("value", sample);

    })

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildPlots(firstSample);
    buildMetadata(firstSample)
    bonus(firstSample);

  });

}

function optionChanged(newSample) {
  //     // Fetch new data each time a new sample is selected
  buildPlots(newSample);
  buildMetadata(newSample);
  bonus(newSample);
}

//   // Initialize the dashboard
init();