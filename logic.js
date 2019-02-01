// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAEW63bD_lzmU6q0NSxPQYqbkgesZ_QRhw",
    authDomain: "traintime-1ebe0.firebaseapp.com",
    databaseURL: "https://traintime-1ebe0.firebaseio.com",
    projectId: "traintime-1ebe0",
    storageBucket: "traintime-1ebe0.appspot.com",
    messagingSenderId: "635048265319"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val();
    var destInput = $("#destination-input").val().trim();
    var firstTrainInput = moment($("#firstTrain-input").val().trim(), "MM/DD/YYYY").format("X");
    var freqInput = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        dest: destInput,
        start: firstTrainInput,
        freq: freqInput
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.freq);

    
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding newTrain to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destInput = childSnapshot.val().dest;
    var firstTrainInput = childSnapshot.val().start;
    var freqInput = childSnapshot.val().freq;

    // Employee Info
    console.log(trainName);
    console.log(destInput);
    console.log(firstTrainInput);
    console.log(freqInput);

  



 // First Time (pushed back 1 year to make sure it comes before current time)
 var firstTimeConverted = moment(firstTrainInput, "HH:mm").subtract(1, "years");
 console.log(firstTimeConverted);

 // Current Time
 var currentTime = moment();
 console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

 // Difference between the times
 var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 console.log("DIFFERENCE IN TIME: " + diffTime);

 // Time apart (remainder)
 var tRemainder = diffTime % freqInput;
 console.log(tRemainder);

 // Minute Until Train
 var tMinutesTillTrain = freqInput - tRemainder;
 console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

 // Next Train
 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

     // Create the new row
     var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destInput),
        $("<td>").text(firstTrainInput),
        $("<td>").text(freqInput),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),
        
    );
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
});



