// all things related to retriving data with axios
// goes here

const API_BASE_URL = "https://api.foursquare.com/v3/places/";
const API_KEY = "fsq3QDBN0pfxk64qwMqNNvXhhDwbZOfIZqUEa4L/YjiNATQ="

// tells the Foursquare API server that the format of data we are sending is JSON
const headers = {
    Accept: 'application/json',
    // API Key to use; the API Key identifies which project it's
    Authorization: API_KEY
}

// async function main () {
//     let ll = "1.3521, 103.8198"; //for leaflet latlng is an array, for four square is a string
//     let response = await axios.get(API_BASE_URL + "search", {
//         "headers": headers,
//         "param": {
//             'll': ll,
//             'query': "chicken rice"
//             //'v': 20210903,         
//         }
//     });
//     console.log(response.data);
// }

// main();

async function placeSearch() {
    try {
        const searchParams = new URLSearchParams({
          query: 'chicken rice',
          ll: '1.3521, 103.8198',
          open_now: 'true',
          sort: 'DISTANCE'
        });
        const results = await fetch(
          `https://api.foursquare.com/v3/places/search?${searchParams}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'fsq3QDBN0pfxk64qwMqNNvXhhDwbZOfIZqUEa4L/YjiNATQ=',
            }
          }
        );
        const data = await results.json();
        return data;
    } catch (err) {
        console.error(err);
    }
    console.log(response.data);
}

placeSearch();