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


$("#submit").on("click", function() {
  event.preventDefault();

  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTime = $("#first-time").val().trim();
  frequency = $("#frequency").val().trim();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

dataRef.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().trainName);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTime);
  console.log(childSnapshot.val().frequency);


  // full list of items to the div
  $("#train-schedule").append("<div class='row'><div class='col-md-2'> " + childSnapshot.val().trainName +
    " </div><div class='col-md-2'> " + childSnapshot.val().destination +
    " </div><div class='col-md-2'> " + childSnapshot.val().firstTime +
    " </div><div class='col-md-2'> " + childSnapshot.val().frequency + " </div></div>");

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
