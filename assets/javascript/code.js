//==============================================================================
// CONNECTIONS / VARIABLES
//==============================================================================

// Connections
  var config = {
    apiKey: "AIzaSyA_4FQfxM-xK9OF0VR_tGy3_JPwn3xHy50",
    authDomain: "group-project-c3573.firebaseapp.com",
    databaseURL: "https://group-project-c3573.firebaseio.com",
    storageBucket: "group-project-c3573.appspot.com",
    messagingSenderId: "739150894727"
  };
  firebase.initializeApp(config);

  // Variables
  var database = firebase.database();

//==============================================================================
// LISTNERS
//==============================================================================

  // --> Go Button Listener.  This will receive user data and go to the giphy api to pull images.
  $("#image-button").on("click", function() {
    var item = $(this).attr("#image-input");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      item + "&api_key=dc6zaTOxFJmzC&limit=10";
console.log(item);
console.log(queryURL);
    // Call to ghiphy
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        // Get data from ghiphy API
        var rating = results[i].rating;
        var animatedUrl = results[i].images.fixed_height.url;
        var url = results[i].images.fixed_height_still.url;

        // Create DIV object
        var gifDiv = $("<div class='item'>");
        var p = $("<p>").text("Rating: " + rating);

        var itemImage = $("<img src=" + url + " data-state='animate' alt=" + url + ">").click(function(){

        });

        itemImage.attr("src", results[i].images.fix_height);

        //gifDiv.prepend(p);
        gifDiv.prepend(itemImage);

        $("#image-display").prepend(gifDiv);
      }
    });
  });

  // --> Images Button Listner.  This will save user text and store in Firebase to hold the data.
  $("#add-button").on("click", function() {
    // Prevent form from submitting
    event.preventDefault();

    // Get input from user
    var storyText = $("#text-area").val().trim();
      console.log(storyText);
    // Save input to firebase
    database.ref().push({
      Story : storyText
    });
  });

  //=============================================================================
  // DATAEBASE - Firebase
  //=============================================================================

  database.ref().on("child_added", function(childSnapshot) {

    // Create paragraph object
    var newParagraph = $("<p>");

    // Add HTML
    newParagraph.text(childSnapshot.val().storyText);

    $("#recieve-text").append(newParagraph);
  });
