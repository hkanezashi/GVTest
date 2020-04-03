mapboxgl.accessToken = 'pk.eyJ1IjoiaGthbmV6YXNoaSIsImEiOiJjamh0cDA5ODkwZnl0M2tydnlldmdrcTljIn0.qwv3INHvhtQd-CaUwPNhhw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-73.98, 40.75],
    zoom: 8,
    minZoom: 6
});
map.on('load', function() {
    // Add a source for the state polygons.
    map.addSource('nyczip', {
        'type': 'geojson',
        'data': 'https://raw.githubusercontent.com/hkanezashi/GVTest/master/docs/data/nyc-zip-data.geojson'
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