// Use DOMContentLoaded as our main entry point
window.addEventListener("DOMContentLoaded", async function (){

    // this function is to setup the application
    function init(){
        let map = initMap();

        // add a layer to store the search results
        let searchResultLayer = L.layerGroup();
        searchResultLayer.addTo(map);

        document.querySelector("#btnToggleSearch").addEventListener("click", async function() {
            // remove all the existing markers first before adding the new ones
            searchResultLayer.clearLayers();
            let searchTerms = document.querySelector("#searchTerm").value;
            let boundaries = map.getBounds();
            let center = boundaries.getCenter(); //in lat lng
            let latLng = center.lat + "," + center.lng; //Foursquare expects          
            let searchResults = await search(latLng, searchTerms, 5000);
            console.log(results);

            for (let r of searchResult.results) {
        	    let lat = r.geocodes.main.latitude;
        	    let lng = r.geocodes.main.longitude;
        	    //console.log(lat, lng);
                L.marker(lat, lng).addTo(map);
            }

            // let searchContainerElement = document.querySelector('#search-container');
            // let currentDisplay = searchContainerElement.style.display;
            // if (! currentDisplay || currentDisplay=='none') {
            //     // if it is not visible
            //     searchContainerElement.style.display = "block";
            // } else {
            //     searchContainerElement.style.display = "none";
            // }
        });
    }

    init();

});

function initMap(){ 
    
    // create a map object and set the center point and the zoom
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

    return map; // return map as a result of the function
}