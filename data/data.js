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

async function searchPlace () {
    let ll = "1.3521, 103.8198"; //for leaflet latlng is an array, for four square is a string
    let response = await axios.get(API_BASE_URL + "/places/search", {
        headers: {
            ...headers
        },
        param: {
            ll: 'll',
            query: 'query',
            radius: 100000,  
            limit: 50, 
        }
    });
    console.log(response.data);
    return response.dat;
}
searchPlace();


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

