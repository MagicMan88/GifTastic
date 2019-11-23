// Topics and buttons variables
var topics = ["Harry Potter", "Gandalf", "James Bond", "Sirius Black", "Chicken Little"];
var newButton;

// // Function to create new buttons from the topics array
var buttonGenerator = function () {
    // Empty the previous div elements
    // $('#buttons').empty();
    // loops through the array and creates buttons
    for (i = 0; i < topics.length; i++) {
        var newButton = $('<button>');
        newButton.addClass('topics')
        newButton.attr('data', topics[i]);
        $('#buttons').append(newButton);
    };
}
buttonGenerator();

// Event listener for all button elements
$('button').on('click', function () {
    var topics = $(this).attr('data-person');
    // URL to search giphy for the name of the added character
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topics + "&api_key=EDIhLQCerntt3WVSp8CaSSY2I70Ug4Di&limit=10";
    // Perform the AJAX 'GET' request
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .then(function (response) {
            // Storing the array of results in the results variable
            var results = response.data;

            /// Loop through every result item
            for (var i = 0; i < results.length; i++) {

                // Only take action if the photo has an appropriate rating
                if (results[i] !== 'r' && results[i].rating !== 'pg-13') {
                    // Creating a div for the gif
                    var gifDiv = $('<div>');

                    // Store the results rating
                    var rating = results[i].rating;

                    // Create a paragraph tag with the results rating

                    var p = $('<p>').text('Rating: ' + rating);

                    // Create an image tag
                    var topicsImg = $('<img>');

                    // Make sure to grab the still images so you can unpause on click
                    topicsImg.attr("src", results[i].images.fixed_height_still.url);
                    topicsImg.attr("data-still", results[i].images.fixed_height_still.url);
                    topicsImg.attr("data-animate", results[i].images.fixed_height.url)
                    topicsImg.attr("data-state", "still")
                    topicsImg.addClass("gif");

                    // Append the paragraph and topicsImg to the gifDiv created above
                    gifDiv.append(p);
                    gifDiv.append(topicsImg);

                    // Prepend the gifDiv to the Gif's go here id 
                    $('#gifs-go-here').prepend(gifDiv);

                    // Function to animate gifs
                    $(".gif").on("click", function (event) {
                        event.preventDefault();

                        // gets the current state of the clicked gif 
                        var state = $(this).attr("data-state");

                        // according to the current state gifs toggle between animate and still 
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }

                    })

                    $('#add-topic').on('click', function (event) {
                        event.preventDefault();
                        console.log('submit');
                        // sets inputted value to newTopic 
                        newTopic = $('#topic-input').val().trim();
                        // new topic is added to the topics array 
                        topics.push(newTopic);
                        console.log(topics);
                    });

                };
            };
        });
});