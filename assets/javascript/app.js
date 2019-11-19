// Main Processes
// ============================================
$(document).ready(function () {
    // Array of topics, mine is favorite fictional characters
    var topics = ["Harry Potter", "Gandalf", "James Bond", "Sirius Black", "Chicken Little"];

    // Get the gifs from the giphy API
 $('#button').on('click', function () {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=EDIhLQCerntt3WVSp8CaSSY2I70Ug4Di&limit=10";
    // ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // Store array of results in results variable
        var results = response.data;
        // $('#characters).empty();
        // For loop through results
        for (var i = 0; i < results.length; i++) {
            // Create new div
            var charDiv = $('<div>');
            // Create new p tag
            var p = $('<p>').text("Rating " + results[i].rating);
            // Create new img tag
            var charImg = $('<img>');
            charImg.attr("src", results[i].images.original_still.url);
            charImg.attr("data-still", results[i].images.original_still.url);
            charImg.attr("data-animate", results[i].images.original.url);
            charImg.attr("data-state", "still");
            charImg.attr("class", "gif");
            charDiv.append(p);
            charDiv.append(charImg);
            $("#movies").append(charDiv);
        }
    });
});

    // Create a function to dynamically generate and display buttons
    function renderButtons() {
        // Delete buttons prior to adding new ones otherwise will have repeats
        $("buttons").empty();
        // Loop through the array of topics, dynamically creating gifs for each topic
        for (var i = 0; i < topics.length; i++) {
            // Create new div
            var gifDiv = $('<div>');
            var rating = results[i].rating;
            // Create new p tag
            var p = $('<p>').text("Rating " + rating);
            // Create new img tag
            var personImage = $('<img>');
            personImage.attr("src", results[i].images.fixed_height.url);
            // preprend to html
            gifDiv.prepend(p);
            gifDiv.prepend(personImage);
            // Add gifs to 'gifs-go-here' id
            $('gifs-go-here').prepend(gifDiv);
        }
    }

    // Call renderButtons function
    renderButtons();

    // Add a new button for each new fictional character
    $('#add-character').on('click', function () {
        event.preventDefault();
        // Assign character to character-input id
        var character = $('#character-input').val().trim();
        // Add new character to topics array
        topics.push(character);
        // Generate button for new character
        renderButtons();
        return;
    });

    // Function to change state of gif
    function changeState() {
        var state = $(this).attr('data-state');
        var animateImg = $(this).attr('data-animate');
        var stillImg = $(this).attr('data-still');

        if (state == 'still') {
            $(this).attr('src', animateImg);
            $(this).attr('data-state', 'animate');
        } else if (state == 'animate') {
            $(this).attr('src', stillImg);
            $(this).attr('data-state', 'still');
        }
    }

    $(document).on('click', '.gif', changeState);
});
