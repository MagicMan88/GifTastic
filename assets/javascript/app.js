// Main Processes
// ============================================
$(document).ready(function () {
    // Array of topics, mine is favorite fictional characters
    var topics = ["Harry Potter", "Gandalf", "James Bond", "Sirius Black", "Chicken Little"];
    // Create a function to dynamically generate and display data

    function renderButtons() {
        // Delete buttons prior to adding new ones otherwise will have repeats
        $("buttons").empty();
        // Loop through the array of topics, dynamically creating buttons for each topic
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



});
