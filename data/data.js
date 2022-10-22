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

// async function main () {
//     let ll = "1.3521, 103.8198";  
//     let response = await axios.get(API_BASE_URL + "search", {
//         "headers": headers,
//         "param": {
//             "ll": ll,
//             "query": "burger",
//             //"near":"Singapore"
//             "radius": 100000, // 100km
//             "category": 13032, //ok for category to be empty string
//             "limit": 50,
//             "v": "20210903", //(Unique Foursquare) YYYYMMDD format for version control
//         }
//     });
//     console.log(response.data);
//     return response.data;
// }

// main()

// async function search(ll, search, radius, category="") {
//     let url = API_BASE_URL + "search";
//     let response = await axios.get(url, {
//         "headers": headers,
//         "param": {
//             "ll": ll,
//             "query": query,
//             "radius": radius,
//             "category": category, //ok for category to be empty string
//             "limit": 50,
//             "v": "20210903", //(Unique Foursquare) YYYYMMDD format for version control
//         }
//     });
//     console.log(response.data);
//     return response.data;
// }

// async function main() {   //return the search result from the function
//     let result = await search("1.527549, 103.745476", "fish soup", 5000);
//     for (let r of result) {
//         L.marker}
// }


async function search(lat, lng, query) {       // refer to Foursquare  Oct21@2221 
    // create the coordinate
    let ll = lat + "," + lng;
    let response = await axios.get(API_BASE_URL + "/places/search", {
        headers: {
            ...headers
        },
        params: {
            'll': '1.3521, 103.8198',
            //'v': '20210903',      // YYYYMMDD format (It's for version control)
            'query': 'burger',
            'radius': 100000,    //100km
            'limit':50, 
            'category': 13032,  // to check foursquare for the right code for MOS burger
        }
    });
    console.log(response.data);
    return response.data;   // to return the search result for the function
}

search(1.3521, 103.8198, "MOS burger")