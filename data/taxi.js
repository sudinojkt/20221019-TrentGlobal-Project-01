window.addEventListener("DOMContentLoaded", async function() {
    let map = L.map('map').setView([1.3521, 103.8198], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    }).addTo(map);    
   
    let taxiResponse = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    let taxiData = taxiResponse.data;
    for (let taxi of taxiData.features[0].geometry.coordinates) {
        let marker = L.marker(taxi[1], taxi[0]);
        marker.addTo(taxiLayer);
        console.log(response.data.taxiLayer);
    }
});
return map;