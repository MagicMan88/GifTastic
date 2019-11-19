// Variables
// ============================================

// Event listener for all button elements
$("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var person = $(this).attr("data-person");
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=EDIhLQCerntt3WVSp8CaSSY2I70Ug4Di&limit=5";

    // Actually getting the data from the API (Performing our AJAX GET method)
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Store an array of results in the results variable
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img>");
          personImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(personImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });

// Functions
// ============================================



// Main Processes
// ============================================
