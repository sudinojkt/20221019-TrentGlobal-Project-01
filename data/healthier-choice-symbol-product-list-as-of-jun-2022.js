let data = {
  resource_id: 'd3b2447d-0a42-4510-9859-9be85511de8a', // the resource id
  limit: 5, // get 5 results
  q: 'jones' // query for 'jones'
};
$.ajax({
  url: 'https://data.gov.sg/api/action/datastore_search',
  data: data,
  dataType: 'jsonp',
  success: function(data) {
    alert('Total results found: ' + data.result.total)
  }
});
