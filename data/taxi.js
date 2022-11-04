window.addEventListener("DOMContentLoaded", async function() {
    let taxiResponse = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    let taxiData = taxiResponse.data;
    for (let taxi of taxiData.features[0].geometry.coordinates) {
        //let lat = t[1];
        //let lng = t[0];
        //let marker = L.marker([lng,lat]);
        let marker = L.marker(taxi[1], taxi[0]);
        marker.addTo(taxiLayer);
        console.log(taxiLayer);
    }
});