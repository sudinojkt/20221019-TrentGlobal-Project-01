// all things related to retriving data with axios goes here
const API_BASE_URL = "https://api.foursquare.com/v3";
const API_KEY = "fsq3QDBN0pfxk64qwMqNNvXhhDwbZOfIZqUEa4L/YjiNATQ=";

// tells the Foursquare API server that the format of data we are sending is JSON
const headers = {
    Accept: 'application/json',
    // API Key to use; the API Key identifies which project it's
    Authorization: API_KEY,
}

//async function searchPlace(lat, lng, searchPlace, radius, category="")
async function searchPlace(lat, lng, searchPlace) {
let url = API_BASE_URL + "/places/search";
let ll = lat + "," + lng;
let response = await axios.get(url, {
    headers: { ...headers },
    params: {
        ll: ll,
        query: searchPlace, //must not have " "
        radius: 100000,
        category: 13000,
        limit: 30,
        v: 20210903,
    }
});
//console.log(response.data)
return response.data;
}

// async function main() {

//     let results = await searchPlace(1.3521, 103.8198, "coffee bean", 5000);
//     for (let r of results){
//         L.marker
//     }

// }
// main();