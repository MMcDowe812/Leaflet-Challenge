const Url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

// set up URL link
d3.json(Url).then(function (data) {
    let quake = data.features
  createFeatures(quake);
});

function createFeatures(earthquakeData) {

  // Creating Popups
  function onEachFeature(feature, layer) {
    
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}</p>`);
    // L.circle([50.5, 30.5], {radius: 200}).addTo(earthquakes);
  }
  
  // creating geoJSON with feature
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}

function createMap(earthquakes) {
    
  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {})

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street
  };

  // Creating overlay
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Creation of map
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });
  

  //create layers legend
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


  L.circle([properties.geometry.coordinates[0],properties.geometry.coordinates[1] ], {radius: ([properties.mag]*20)}).addTo(myMap);
}
