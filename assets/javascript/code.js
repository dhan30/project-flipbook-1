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
  $("#images-button").on("click", function() {
    
    $("#image-display").html("");
    
    var item = $('#image-input').val().trim();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      item + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    // Call to ghiphy
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;

      for (var i = 0; i < 3; i++) {
        // Get data from ghiphy API
        var rating = results[i].rating;
        var animatedUrl = results[i].images.fixed_height.url;
        var url = results[i].images.fixed_height_still.url;

        // Create DIV object
        var gifDiv = $("<div class='item'>");
        var p = $("<p>").text("Rating: " + rating);
        var radioButton = $('<input type="radio" name="image" id=' + url + '/>');
        var itemImage = $("<img src=" + url + " data-state='animate' alt=" + url + " id='image' >").click(function(){

        });

        itemImage.attr("src", results[i].images.fix_height);

        //gifDiv.prepend(p);
        gifDiv.prepend(itemImage);
        gifDiv.prepend(radioButton);

        $("#image-display").prepend(gifDiv);
      }
    });
    $("#image-input").val("");
  });

  // --> Images Button Listner.  This will save user text and store in Firebase to hold the data.
  // $("#add-button").on("click", function() {
  //   // Prevent form from submitting
  //   event.preventDefault();
  //
  //   // Get input from user
  //   var image = $('#image-input').val().trim();
  //   var storyText = $("#text-area").val().trim();
  //
  //   // Save input to firebase
  //   database.ref().push({
  //     Story : storyText
  //   });
  // });

  //=============================================================================
  // DATAEBASE - Firebase
  //=============================================================================

  database.ref().on("child_added", function(childSnapshot) {

    // Create HTML Objects
    var newDiv = $("<div class='page'>");
    var newDiv2 = $("<div class='text-box-1'>")
    var newParagraph = $("<p>");
    var newImage = $("<img>");
    //newImage.attr("src", "items[i]");
    
    // Add HTML
    newImage.attr("src", childSnapshot.val().Image);
    newParagraph.text(childSnapshot.val().Story);
    newImage.text(childSnapshot.val().Image);
    newDiv2.append(newParagraph).append(newImage);
    newDiv.append(newDiv2);
    $(".page").append(newDiv);
    console.log(newParagraph);
  });
//   firebase.database().ref(...).on('value'.function(snapshot) {
//       var counter = 0;
//       snapshot.forEach(function(minisnapshot) {
//             alert("test");
//             //
//             minisnapshot.child("books").foreach(function(mainsnapshot) {
//                   counter +=0.5;
//                   var data = {
//                         price:mainsnapshot.child("price").val() * counter;
//                         ...
//                   }
//             }
//       }
// }
  //=============================================================================
  // FUNCTIONS
  //=============================================================================

  function submitForm() {
    var userStory = $("#text-area").val().trim();
    var userImage = $(":radio:checked").attr('id');
    console.log(userStory + userImage);
    var usersRef = firebase.database().ref('books');
    var adaRef = usersRef.child('ada');
    var adaFirstNameRef = adaRef.child('book');
    var path = adaFirstNameRef.toString();
    console.log(path);
    // Save input to firebase
    database.ref().push({

      Story : userStory,
      Image : userImage
    });

    $("#text-area").val("");
    $("#image-display").html("");
    $("#image-input").val("");
  }
