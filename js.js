//CREATE AN ARRAY FOR ANIMALS
	var animals = ["Puppy", "Cat", "Bird", "Snake", "Bear"];

// WAIT FOR DOC TO LOAD
	$(document).ready(function(){
// CREATE BUTTON FUNCTION
	function createButtons() {
		//EMPTY OUT AREA FOR BUTTONS
		$("#main-header").empty();	
		// LOOP THROUGH THE ARRAY OF ANIMALS
		for (var i = 0; i < animals.length; i++) {
			//CREATE ELEMENT BUTTON AND STORE IT INTO VARIABLE BT
			var bt = $("<button>");
			// ADD CLASS OF .ANIMAL
			bt.addClass("animal");
			// CREATE ATTRIBUTE OF DATA-ANIMAL NEXT ITEM IN ARRAY
			bt.attr("data-animal", animals[i]);
			// NAME THE BUTTON SAME AS USER TEXT INPUT
			bt.text(animals[i])
			//APPEND BUTTON IN DIV MAIN-HEADER
			$("#main-header").append(bt);
		}
	
		// GRAB ALL ELEMENT WITH CLASS ANIMAL AND CREATE CLICK FUNCTION
		$(".animal").on("click", function () {
			// EMPTY OUT DIV FOR IMAGE
			$("#mini-box").empty();
			//GRAB THE ATTR OF DATA-ANIMALS FOR ALL BUTTONS AND STORE INTO VAR ANIMAL
		var animal = $(this).attr("data-animal");
		// CREATE LINK URL FOR GIPHYS
		var queryURL = "//api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        //AJAX FUNCTION GET METHOD 
        $.ajax({
        	url: queryURL,
        	method: "GET"
        	// CREATE RESPONSE FUNCTION AFTER RETRIEVING DATA
        }).done(function(response) {

        	console.log(response);
        	// GET RESPONSE DATA AND STORE IN VARIABLE RESULTS
        	var results = response.data
        	// LOOP THROUGH
        	for (var i = 0; i < results.length; i++) {
        		// CREATE LIST FOR IMG AND STORE IN VARIABLE ANIMAL DIV
        		var animalDiv = $("<ol>");
        		// CREATING PARAGRAPH TAG FOR RATINGS OF GIF STORE IN VAR P
        		var p = $("<p>").text("Rating: " + results[i].rating);
        		// CREATE IMAGE TAG AND STORE IN VAR ANIMAL IMAGE
        		var animalImage = $("<img>");
        		// CREATE SOURCE ATTR FOR ALL IMG TAGS LINK STILL GIF
        		animalImage.attr("src", results[i].images.fixed_height_still.url);
        		// CREATE CLASS GIF
        		animalImage.attr("class","gif");
        		// CREATE ATTRA DATA-ANITMATE,  GRAB URL FROM OBJ SOURCE
        		animalImage.attr("data-animate", results[i].images.fixed_height.url);
        		// CREATE ATTRA DATA STILL, GRAB URL FROM OBJ SOURCE
          		animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          		// CREATE DATA STATE STILL FOR IF/ELSE STATEMENT
          		animalImage.attr("data-state", "still");
          		// APPEND RATING PTAG TO LIST <OL>
        		animalDiv.append(p);
        		// APPEND IMAGE TO LIST <OL>
        		animalDiv.append(animalImage);
        		
        		// PREPEND GIFS(ANIMALDIV) TO 
        		$("#mini-box").prepend(animalDiv);
        	//for loop closing bracket(cb)
        	}
        //START STOP FUNCTION
        $(".gif").on("click", function () {
        // GRAB GIF ATTRIBUTE DATA STATE
		var state = $(this).attr("data-state");
			// CHECK IF ATTR STATE IS EQUAL TO STILL
      		if (state === "still") {
      		// GRAB GIF ATTRIBUTE DATA ANIMATE
        var dataAnimate = $(this).attr("data-animate")
        //$(this).attr("src", dataAnimate)
        // grabing the button, grabbing src, and assigning it to the attr data-animate
        $(this).attr('src', dataAnimate);//path to file to attribute
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
		});
        //function response cb
        });

//.animal onclick function cb
	})


//createButton function cb
}
	
	// CREATE NEW BUTTON ANIMAL FUNCTION
	$("#add-animal").on("click", function (event) {
		// AVOID AUTO REFRESH
		event.preventDefault();
		// GRAB THE VALUE OF USER TEXT INPUT FROM LABEL FORM AND STORE INTO VARIABLE
		var newAnimal = $("#animal-input").val().trim();
		// TAKE THE VALUE OF THE TEXT AND PUSH INTO A ARRAY 
		animals.push(newAnimal);
		// CALL createButton function TO CREATE NEW BUTTON BASED ON USER INPUT
		createButtons();

	});
// CALL FUNCTION TO CREATE BUTTONS
	createButtons();


});





	

