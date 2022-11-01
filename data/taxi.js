    
    async function taxi() {
    let response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    let coordinates = response.data.features[0].geometry.coordinates;
    for (let c of coordinates) {
        let lat = c[1];  // because the coordinates are in the [lng, lat], we have to reformat [lat, lng]
        let lng = c[0];
        let marker = L.marker([lat, lng]);
        marker.addTo(markerClusterLayer)
    }}

setInterval(async function () {
    console.log("Time up")
    markerClusterLayer.clearLayers();  // remove all the existing markers
    let response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    let coordinates = response.data.features[0].geometry.coordinates;
    for (let c of coordinates) {
        let lat = c[1];  // because the coordinates are in the [lng, lat], we have to reformat [lat, lng]
        let lng = c[0];
        let marker = L.marker([lat, lng]);
        marker.bindPopup(`<p>${lat}, ${lng}</p>`)
        marker.addTo(markerClusterLayer)
    }
}, 1000 * 30);