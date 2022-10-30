window.addEventListener("DOMContentLoaded", async function(){
    function init(){
        let map = initMap();
        let searchResultLayer = L.layerGroup();

        searchResultLayer.addTo(map);
        document.querySelector("#btnToggleSearch").addEventListener("click", async function(){
            let searchContainerElement = document.querySelector("#search-container");
            let currentDisplay = searchContainerElement.style.display;
            if (!currentDisplay || currentDisplay == 'none'){
                searchContainerElement.style.display = "block";
            } else {
                searchContainerElement.style.display = "none";  }
            });
        
        document.querySelector("#btnSearch").addEventListener("click", async function(){
            let clearResult = document.querySelector("#results");
            clearResult.innerHTML = "";
            searchResultLayer.clearLayers();
            
            let searchTerms = document.querySelector("#searchTerms").value;
            let boundaries = map.getBounds();
            let center = boundaries.getCenter();
            let latlng = center.lat + "," + center.lng;

            let categoryID = document.querySelector("#foods").value
            let searchResults = await search(latlng, searchTerms, categoryID);

            let searchResultElement = document.querySelector("#results");
            for (let r of searchResults.results){
                console.log(r);
                //Display the marker
                let lat = r.geocodes.main.latitude;
                let lng = r.geocodes.main.longitude;

                let marker = L.marker([lat, lng]).addTo(searchResultLayer);
                marker.bindPopup(function(){
                    let el = document.createElement('div');
                    el.classList.add("popup");
                    el.innerHTML = `<h1>${r.name}</h1>`

                async function getPicture(){
                    let photos = await getPhoto(r.fsq_id);
                    let firstPhoto = photos[0];
                    let url = firstPhoto.prefix + "100x100" + firstPhoto.suffix;
                    el.innerHTML += `<img src="${url}"/>`
                }
                    getPicture();
                    return el;
                });
                
                let resultElement = document.createElement("div");
                resultElement.innerText = r.name;
                resultElement.classList.add("search-result");
                resultElement.addEventListener("click", function () {
                    map.flyTo([r.geocodes.main.latitude, r.geocodes.main.longitude], 16)
                    marker.openPopup();
                });
                searchResultElement.appendChild(resultElement);
            }
        });
    }
    init();
});

function initMap() { 
    // create a map object and set center point zoom
    let map = L.map('map').setView([1.3521, 103.8198], 11);

    // need set up the tile layer
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    }).addTo(map);
    console.log(Response.data);
    return map; // return map as a result of the function
}

//create a marker cluster
let markerClusterLayer = L.markerClusterGroup();
let markerClusterLayerList = [];

function getRandomLatLng(map) {
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;
    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;
    return [ randomLat, randomLng,];
    }
