$(document).ready(function () {

    var movies = [
        "Harry Potter",
        "Gandalf",
        "James Bond",
        "Sirius Black",
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

    $(document).on('click', '.movie-button', function () {
        $('#movies').empty();
        $('.movie-button').removeClass('active');
        $(this).addClass('active');

        var type = $('this').attr('data-type');
        var queryUrl = 'http://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=EDIhLQCerntt3WVSp8CaSSY2I70Ug4Di';

        $.ajax({
                url: queryUrl,
                method: 'GET'
            })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var movieDiv = $("<div class=\"movie-item\">");
                }
            })
    })
});