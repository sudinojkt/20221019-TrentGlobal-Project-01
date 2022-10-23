// all things related to retriving data with axios
// goes here

const API_BASE_URL = "https://api.foursquare.com/v3";
const API_KEY = "fsq3QDBN0pfxk64qwMqNNvXhhDwbZOfIZqUEa4L/YjiNATQ="

// tells the Foursquare API server that the format of data we are sending is JSON
const headers = {
    Accept: 'application/json',
    // API Key to use; the API Key identifies which project it's
    Authorization: API_KEY
}

async function main () {
    let ll = "1.3521, 103.8198"; //for leaflet latlng is an array, for four square is a string
    let response = await axios.get(API_BASE_URL + "search", {
        "headers": headers,
        "param": {
            "ll": ll,
            "query": "chicken rice"
            'v': "20210903", //(Unique Foursquare) YYYYMMDD format for version control            
        }
    });
    console.log(response.data);
}

main();

