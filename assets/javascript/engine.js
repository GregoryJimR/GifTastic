$(document).ready(function() {
    //original array
    var footballArray = ["Carolina Panthers", "Cam Newton", "Devin Funchess", "Luke Kuechly"];
    //ths function creates a button from teh array and assigns a class (buttonclick)
    //as well as an attribute (button-name) and assigns the index as the name of the button.
    //it also writes the index as the name of the button.

    var renderButton = function() {
        $(".button-view").empty();
        for (var i = 0; i < footballArray.length; i++) {
            var a = $("<button>");
            a.addClass("buttonclick");
            a.attr("button-name", footballArray[i]);
            a.text(footballArray[i]);
            $(".button-view").append(a);
        }
    };

    //logs when button is clicked.  takes the index object's button-name and stores it in variable buttonText
    //adds buttonText to a URL string where the search term is to be written
    var giphState = function() {
        console.log("giph clicked");
        console.log($(this).attr("data-state"));



        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animated");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    };

    var giphyAccess = function() {
        console.log("button click is working");
        var buttonText = $(this).attr("button-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";

        console.log(buttonText);
        console.log(queryURL);

        //uses API to 'GET' giph data and return it (once the communication has been completed)
        //loops over the response 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            $(".giphy-view").empty();
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var footballImage = $("<img>");
                footballImage.attr("src", results[i].images.fixed_height_still.url);
                footballImage.attr("data-still", results[i].images.fixed_height_still.url);
                footballImage.attr("data-animate", results[i].images.fixed_height.url);
                footballImage.attr("data-state", "still");
                footballImage.attr("class", "giphImage");

                gifDiv.prepend(p);
                gifDiv.prepend(footballImage);
                $(".giphy-view").prepend(gifDiv);
            }
        });
    };
    //on-clicks
    $(".buttonclick").on("click", giphyAccess);
    $(".giphimage").on("click", giphState);
    $("#add-button").on("click", function() {
        console.log(footballArray);
        event.preventDefault();
        var footballInput = $("#button-input").val().trim();
        footballArray.push(footballInput);
        renderButton();

    });

    //event listeners
    $(".button-view").on("click", ".buttonclick", giphyAccess)
    $(".giphy-view").on("click", ".giphImage", giphState)

    //default buttons rendered here
    renderButton();

});
