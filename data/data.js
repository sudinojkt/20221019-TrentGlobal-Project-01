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

async function search(lat, lng, query) {       // As provides by Foursquare  Oct21@2221 
    // create the coordinate
    let ll = lat + "," + lng;
    let response = await axios.get(API_BASE_URL + "/places/search", {
        headers: {
            ...headers
        },
        params: {
            'll': ll,
            'v': '20210903',  // YYYYMMDD format (It's for version control)
            'query': 'query',
            'radius': 100000, //100km
            //'limit':50, 
            //'category': 13072,  // to check foursquare for the right code for MOS burger
        }
    });
    console.log(response.data);
    return response.data;   // to return the search result for the function
}

//search(1.3521, 103.8198, "MOS burger")