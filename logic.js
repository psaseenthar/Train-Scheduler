// Initialize Firebase
var config = {
  apiKey: "AIzaSyB9cJJbLjp2WNxDgAYJw0kA8_Qf7I_9tKM",
  authDomain: "train-scheduler-8f32b.firebaseapp.com",
  databaseURL: "https://train-scheduler-8f32b.firebaseio.com",
  projectId: "train-scheduler-8f32b",
  storageBucket: "train-scheduler-8f32b.appspot.com",
  messagingSenderId: "55928248146"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTime = "";
var frequency = 0;
var counter = 0;


$("#submit").on("click", function() {
  event.preventDefault();

  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTime = $("#first-time").val().trim();
  frequency = $("#frequency").val().trim();
  counter++;
 
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
    counter: counter,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
  
});

dataRef.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().trainName);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTime);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().counter);


  // full list of items to the div
  $("#train-schedule").append("<div class='row' id=" childSnapshot.val().counter "><div class='col-md-2'> " + childSnapshot.val().trainName +
    " </div><div class='col-md-2'> " + childSnapshot.val().destination +
    " </div><div class='col-md-2'> " + childSnapshot.val().frequency + " </div></div>");  

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

dataRef.ref().orderByChild("counter").on("child_added", function(snapshot) {
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(childSnapshot.val().firstTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % childSnapshot.val().Frequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = childSnapshot.val().Frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  $("#" + childSnapshot.val().counter).append("<div class='col-md-2'> " + nextTrain + "</div>");

});