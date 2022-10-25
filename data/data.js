// All base URLs of API 
const API_BASE_PLACES_URL = "https://api.foursquare.com/v3/places/";   // fsq places search
//const API_BASE_PHOTO_URLS = "https://api.foursquare.com/v3/places/{fsq_id}/photos" // fsq photo API

// All API Keys
const API_KEY = "fsq3QDBN0pfxk64qwMqNNvXhhDwbZOfIZqUEa4L/YjiNATQ=";

// Data format and Authorization
const headers = {
    Accept: 'application/json',
    // API Key to use; the API Key identifies which project it's
    Authorization: API_KEY,
}

// Four Square search categoryIDs
const categoryIDs = {
    "Arts and Entertainment": "10000",
    "Business and Professional Services": "11000",
    "Community and Government": "12000",
    "Dining and Drinking": "13000",
    "Event": "14000",
    "Health and Medicine": "15000",
    "Landmarks and Outdoors": "16000",
    "Retail": "17000",
    "Sports and Recreation": "18000",
    "Travel and Transportation": "19000",
};

// Singapore coordinate
const latLng = "1.3521,103.8198";

//Get place data function  
async function search(latLng, search, category="") {
    let url = API_BASE_PLACES_URL + "search";
    let response = await axios.get(url, {
        "headers": headers,
        "params": {
            "ll": latLng,
            "query": search,
            "radius": 10000,
            "category": category,
            "limit": 50,
            "v": 20210903,
        }
    });
    return response.data;
}

//Get photos data function  
async function getPhoto(fsq_id) {
    let response = await axios.get(API_BASE_URL + `${fsq_id}/photos`,{
        'headers': headers
    });
    return response.data;
}