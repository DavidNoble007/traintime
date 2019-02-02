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
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var firstTrain = moment($("#firstTrainstart-input").val().trim(), "HH:mm").format("X");
    var freq = $("#freq-input").val().trim();
  
    // Creates local "temporary" object for holding new train data
    var newTrain = {
      name: trainName,
      destination: dest,
      start: firstTrain,
      frequency: freq
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
   
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#firstTrainstart-input").val("");
    $("#freq-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var freq = childSnapshot.val().frequency;
  

    console.log(trainName);
    console.log(dest);
    console.log(firstTrain);
    console.log(freq);
  
    var trainTime= moment(firstTrain,"hh:mm")
    console.log(trainTime, "traintime")

    var minuteDifference = moment().diff(trainTime,"minutes")
    console.log(minuteDifference,"label")

    var remainder= minuteDifference % freq;
    var minutestillTrain= freq-remainder;
console.log(minutestillTrain,"min")

var nextTrain= moment().add(minutestillTrain,"minutes");
console.log(nextTrain,"next")


  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<th>").text(trainName),
      $("<th>").text(dest),
      $("<th>").text(freq),
      $("<th>").text(moment(nextTrain).format("hh:mm")),
      $("<th>").text(minutestillTrain)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });