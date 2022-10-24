// all things related to retriving data with axios goes here
const API_BASE_URL = "https://api.foursquare.com/v3";
const API_KEY = "fsq3QDBN0pfxk64qwMqNNvXhhDwbZOfIZqUEa4L/YjiNATQ=";

// tells the Foursquare API server that the format of data we are sending is JSON
const headers = {
    Accept: 'application/json',
    // API Key to use; the API Key identifies which project it's
    Authorization: API_KEY,  }

//this is a global function 
async function search(ll, search, radius, category="") {
let url = API_BASE_URL + "/places/search";
let response = await axios.get(url, {
    "headers": headers,
    "params": {
        "ll": ll,
        "query": search,  
        "radius": 100000,
        "category": 13000,
        "limit": 30,
        "v": 20210903,      }
});
return response.data;
}