function initMap() { 
    // create a map object and set center point zoom
    let map = L.map('map').setView([1.3521, 103.8198], 12);

    // need set up the tile layer
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    }).addTo(map);

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    let searchResultLayer = L.markerClusterGroup();
    searchResultLayer.addTo(map);

    let taxiLayer = L.markerClusterGroup();  // create the new Marker Cluster layer
    // taxiLayer.addTo(map)
 
    let busStopLayer = L.markerClusterGroup(); // create the new Marker Cluster layer
    // busStopLayer.addTo(map);

    // Setup Controls
    let baseLayers = {
        'Food': searchResultLayer,
        'Taxi': taxiLayer,
        'Bus': busStopLayer,
    }

    L.control.layers(baseLayers, {}).addTo(map);
 
    return map; 
}


