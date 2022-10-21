const API_BASE_URL="https://api.foursquare.com/v3";
const API_KEY="fsq3QDBN0pfxk64qwMqNNvXhhDwbZOfIZqUEa4L/YjiNATQ="
const headers = {
    Accept: 'application/json',
    Authorization: API_KEY    
}

async function search(lat, lng, query) {
    // create the coordinate
    let ll = lat + "," + lng;
    let response = await axios.get(API_BASE_URL + "/places/search",{
        headers: {
            ...headers
        },
        params: {
            'll': ll,
            'v': '20210903',  // YYYYMMDD format
            'query': query
        }
    })
    console.log(response.data)
    return response.data;
}

search(1.3521,103.8198, "mos burger")