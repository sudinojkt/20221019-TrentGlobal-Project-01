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

async function searchPlace(ll, search, radius, category = "") {
    let url = API_BASE_URL + "/places/search";
    let response = await axios.get(url, {
        headers: { ...headers },
        param: {
            ll: 'll',
            query: 'searchPlace',
            radius: radius,
            category: category,
            limit: 50,
            v: 20210903,
        }
    });
    console.log(response.data)
    return response.data;
}  

//searchPlace("1.3521, 103.8198");

async function main() {
    searchPlace("1.527549, 103.75476", "fish soup", 5000)
}
main();


//  the code below is working 
// async function search(lat, lng, query) {
//     // create the coordinate
//     let ll = lat + "," + lng;
//     let response = await axios.get(API_BASE_URL + "/places/search",{
//         headers: {
//             ...headers
//         },
//         params: {
//             ll: ll,
//             v: '20210903',  // YYYYMMDD format
//             query: query
//         }
//     })
//     console.log(response.data)
//     return response.data;
// }
// search(1.3521,103.8198, "chicken rice")

