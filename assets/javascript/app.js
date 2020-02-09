$(document).ready(function () {
    // Setting a movies array
    var movies = [
        "Harry Potter",
        "Wedding Crashers",
        "James Bond",
        "Mission Impossible",
        "Chicken Little"
    ];

    // Function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        // Loop through the arrayToUse
        for (var i = 0; i < arrayToUse.length; i++) {
            var m = $('<button>');
            m.addClass(classToAdd);
            m.attr('data-type', arrayToUse[i]);
            m.text(arrayToUse[i]);
            $(areaToAddTo).append(m);
        }
    }

    // Event that returns gifs from the giphy API
    $(document).on('click', '.movie-button', function () {
        $('#movies').empty();
        $('.movie-button').removeClass('active');
        $(this).addClass('active');

        var type = $(this).attr('data-type');
        var queryUrl = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=EDIhLQCerntt3WVSp8CaSSY2I70Ug4Di&limit=10';

        $.ajax({
                url: queryUrl,
                method: 'GET'
            })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var movieDiv = $("<div class=\"movie-item\">");

                    var rating = results[i].rating;

                    var p = $('<p>').text('Rating ' + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var movieImage = $('<img>');
                    movieImage.attr('src', still);
                    movieImage.attr('data-still', still);
                    movieImage.attr('data-animate', animated);
                    movieImage.attr('data-state', 'still');
                    movieImage.addClass('movie-image');

                    movieDiv.append(p);
                    movieDiv.append(movieImage);

                    $('#movies').append(movieDiv);
                }
            });
    });

    // Event that animates the gifs on click
    $(document).on('click', '.movie-image', function () {
        var state = $(this).attr('data-state');

        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'still');
        }
    });

    // Event that adds gifs to the movies div on index.html
    $('#add-movie').on('click', function (event) {
        event.preventDefault();
        var newMovie = $('input').eq(0).val();

        if (newMovie.length > 2) {
            movies.push(newMovie);
        }

        populateButtons(movies, 'movie-button', '#movie-buttons');
    });

    populateButtons(movies, 'movie-button', '#movie-buttons');

});