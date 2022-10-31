window.addEventListener("DOMContentLoaded", async function () {
    function init() {
        let map = initMap();
        let searchResultLayer = L.markerClusterGroup();
        searchResultLayer.addTo(map);

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
            for (let Results of searchResults.results) {
                let lat = Results.geocodes.main.latitude;
                let lng = Results.geocodes.main.longitude;

                let marker = L.marker([lat, lng]).addTo(searchResultLayer);
                marker.bindPopup(function () {
                    let element = document.createElement('div');
                    element.classList.add("popup");
                    element.innerHTML = `<h1>${Results.name}</h1>`

                    async function getPicture() {
                        let photos = await getPhoto(Results.fsq_id);
                        let firstPhoto = photos[0];
                        let url = firstPhoto.prefix + "100x100" + firstPhoto.suffix;
                        element.innerHTML += `<img src="${url}"/>`
                    }
                    getPicture();
                });

                let resultElement = document.createElement("div");
                resultElement.innerText = Results.name;
                resultElement.classList.add("search-result");
                resultElement.addEventListener("click", function () {
                    map.flyTo([Results.geocodes.main.latitude, Results.geocodes.main.longitude], 16)
                    marker.openPopup();
                });
                searchResultElement.appendChild(resultElement);
            }
        });
    }
    init();
});
