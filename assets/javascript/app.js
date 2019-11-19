// Variables
// ============================================

// URL for giphy API
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9"



// Functions
// ============================================

// Main Processes
// ============================================

// Calling in the API using an ajax call
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });