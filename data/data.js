// All base URLs of API 
const API_BASE_PLACES_URL = "https://api.foursquare.com/v3/places/"; 

// All API Keys
const API_KEY = "fsq3QDBN0pfxk64qwMqNNvXhhDwbZOfIZqUEa4L/YjiNATQ=";

// Data format and Authorization
const headers = {
    Accept: 'application/json',
    // API Key to use; the API Key identifies which project it's
    Authorization: API_KEY,
}

//Get place data function  
async function search(latLng, search, categories="") {
    if (categories == '0') {
        categories = "13052, 13145, 13338";
    }  
    let url = API_BASE_PLACES_URL + "search";
    let response = await axios.get(url, {
        "headers": headers,
        "params": {
            "ll": latLng,
            "query": search,
            "radius": 12500, 
            "categories": categories,
            "limit": 50,
            "v": 20210903,
        }
    });
    return response.data;
}

//Get photos data 
async function getPhoto(fsq_id) {
    let url = API_BASE_PLACES_URL + fsq_id + "/photos";
    let response = await axios.get(url, {
        'headers': headers,
        "categorie": fsq_id,
    });
    //console.log(response.data);
    return response.data;
}