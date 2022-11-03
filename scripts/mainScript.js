let icons = L.icon({
    iconUrl: '../images/food.png',
    iconSize: [40, 40],
    iconAnchor: [20,40],
    popupAnchor: [0,-40]
});

window.addEventListener("DOMContentLoaded", async function () {

    function init() {
        let map = initMap();

        let searchResultLayer = L.markerClusterGroup();
        searchResultLayer.addTo(map);
        
        // insert weather api
        //let weatherResponse = await axios.get(url);
        //let weatherData = weatherResponse.data;       

        document.querySelector("#btnToggleSearch").addEventListener("click", async function () {
            let searchContainerElement = document.querySelector("#search-container");
            let currentDisplay = searchContainerElement.style.display;
            if (!currentDisplay || currentDisplay == 'none') {
                searchContainerElement.style.display = "block";
            } else {
                searchContainerElement.style.display = "none";
            }
        });

        document.querySelector("#btnSearch").addEventListener("click", async function () {
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
            for (let r of searchResults.results) {
                let lat = r.geocodes.main.latitude;
                let lng = r.geocodes.main.longitude;

                let marker = L.marker([lat, lng], {icon: icons}).addTo(searchResultLayer);
                marker.bindPopup(function () {
                    let el = document.createElement('div');
                    el.classList.add("popup");

                    async function getPicture() {
                        let photos = await getPhoto(r.fsq_id);
                        let firstPhoto = photos[0];
                        let url = firstPhoto.prefix + "100x60" + firstPhoto.suffix;
                        el.innerHTML += `
                        <div class="card" style="width: 18rem;">
                            <img src="${url}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h6 class="card-title">${r.name}</h6>
                                <p class="card-text">${r.location.address} </p>
                                <p class="card-text">${r.categories.map(cat => cat.name)} </p>
                                <div class="card-body">
			                        <a href="#" class="card-link"> </a>
		  	                    </div>
                            </div>
                        </div>          `
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

                    //add circle
                    let circle = L.circle([lat, lng], {
                        color: 'blue',
                        fillColor: 'rgb(255, 165, 0, 0.5)',
                        fillOpacity: 0.5,
                        radius: 200,
                        }).addTo(map);


                });
                searchResultElement.appendChild(resultElement);

            }
        });
    }
    init();
});
