// all things related to retriving data with axios goes here
const API_BASE_URL = "https://api.foursquare.com/v3";
const API_KEY = "fsq3QDBN0pfxk64qwMqNNvXhhDwbZOfIZqUEa4L/YjiNATQ=";
//const Singapore = "1.3521, 103.8198";

// tells the Foursquare API server that the format of data we are sending is JSON
const headers = {
    Accept: 'application/json',
    // API Key to use; the API Key identifies which project it's
    Authorization: API_KEY
}

//async function searchPlace(ll, search, radius, category = "")
async function searchPlace(lat, lng, searchPlace) {
    let url = API_BASE_URL + "/places/search";
    let ll = lat + "," + lng; 
    let response = await axios.get(url, {
        headers: { ...headers },
        params: {
            ll: ll,
            query: 'searchPlace',
            radius: 100000,
            //category: category,
            limit: 10,
            v: 20210903,
        }
    });
    console.log(response.data)
    return response.data;
}

//searchPlace(1.3521, 103.8198, "chicken rice", 1000);

async function main() {
    searchPlace(1.527549, 103.75476, "fish soup", 5000)
}
main();
