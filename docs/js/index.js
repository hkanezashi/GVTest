const data_json = 'https://raw.githubusercontent.com/hkanezashi/GVTest/master/docs/data/nyc-zip-data.geojson';
var data = null;
$.getJSON(data_json, function(input_data){
    data = input_data.features;
});
mapboxgl.accessToken = 'pk.eyJ1IjoiaGthbmV6YXNoaSIsImEiOiJjamh0cDA5ODkwZnl0M2tydnlldmdrcTljIn0.qwv3INHvhtQd-CaUwPNhhw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-73.98, 40.75],
    zoom: 8,
    minZoom: 6
})
map.on('load', function() {
    // Add a source for the state polygons.
    map.addSource('nyczip', {
        'type': 'geojson',
        'data': data_json
    });

    // Add a layer showing the state polygons.
    map.addLayer({
        'id': 'states-layer',
        'type': 'fill',
        'source': 'nyczip',
        'paint': {
            'fill-color': {
                property: 'Positive',
                stops: [[0, '#fff'], [1000, '#f00']]
            },
            'fill-opacity': 0.5
        }
    });

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

        // When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('mouseenter', 'states-layer', function(e) {
//         console.log(map.getSource("nyczip"));
        data.forEach(elem => {
            var prop = elem.properties;
            if(e.features[0].properties.postalCode === prop.postalCode){
                var description = `<h4>${prop.postalCode}: ${prop.PO_NAME}</h4><ul><li>Positive case: ${prop.Positive}</li><li>Total cases: ${prop.Total}</li>`;
                popup
                    .setLngLat(e.lngLat)
                    .setHTML(description)
                    .addTo(map);
            }
        });
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'states-layer', function() {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'states-layer', function() {
        popup.remove();
        map.getCanvas().style.cursor = '';
    });
});