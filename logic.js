// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAyikQpl0Nv3cKPzDlEPGhxeshqx-k8FEc",
    authDomain: "train-activity-64938.firebaseapp.com",
    databaseURL: "https://train-activity-64938.firebaseio.com",
    projectId: "train-activity-64938",
    storageBucket: "",
    messagingSenderId: "741100980653",
    appId: "1:741100980653:web:2c7419c9746c177042b924"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var traindestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trainfrequency = moment($("#frequency-input").val().trim(), "mm").format("X")
  
    // Creates local "temporary" object for holding train data
    var newtrain = {
      name: trainName,
      destination: traindestination,
      start: trainStart,
      frequency: trainfrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newtrain);
  
    // Logs everything to console
    console.log(newtrain.name);
    console.log(newtrain.destination);
    console.log(newtrain.start);
    console.log(newtrain.frequency);
  
    alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var traindestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainfrequency = childSnapshot.val().frequency;
  
    // train Info
    console.log(trainName);
    console.log(traindestination);
    console.log(trainStart);
    console.log(trainfrequency);
  
    // Prettify the train start
    var trainStartPretty = moment.unix(trainStart).format("HH:mm");
    console.log(trainStartPretty)
  
    // Calculate the next train
    var trainNext = trainStart+trainfrequency;
    var trainNextPretty = moment.unix(trainNext).format("HH:mm")
    console.log(trainNextPretty);
  
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(traindestination),
      $("<td>").text(trainStartPretty),
      $("<td>").text(trainfrequency + "mins"),
      $("<td>").text(trainNext)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
