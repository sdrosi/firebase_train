//initialize Firebase

var config = {
    apiKey: "AIzaSyBCGJZ97w1DnMaThbOwJ6GK5gy332sSnwI",
    authDomain: "fir-train-c8fc0.firebaseapp.com",
    databaseURL: "https://fir-train-c8fc0.firebaseio.com",
    projectId: "fir-train-c8fc0",
    storageBucket: "fir-train-c8fc0.appspot.com",
    messagingSenderId: "132925490514"
  };

  firebase.initializeApp(config);

  //variables
  var database = firebase.database();
  var trainName = "";
  var destination = "";
  var frequency = "";
  var time = "";

  //capture the data, yo

  $("#addTrain").on("click", function(){

    event.preventDefault();

    trainName = $("#train-input").val().trim();
    console.log(trainName);
    destination = $("#destination-input").val().trim();
    console.log(destination);
    frequency = $("#frequency-input").val().trim();
    console.log(frequency);
    time = $("#time-input").val().trim();
    console.log(time);

    database.ref().push({
        trainName : trainName,
        destination : destination,
        frequency : frequency,
        time : time
    })
  });

    database.ref().on("child_added", function(childSnapshot){

        var nameDis = childSnapshot.val().trainName;
        console.log(childSnapshot.val().trainName);

        var destinationDis = childSnapshot.val().destination;
        console.log(childSnapshot.val().destination);

        var frequencyDis = childSnapshot.val().frequency;
        console.log(childSnapshot.val().frequency);

        var timeDis = childSnapshot.val().time;
        console.log(childSnapshot.val().time);

        var newRow = $("<tr><td>" + nameDis + "</td><td>" + destinationDis + "</td><td>" + frequencyDis + "</td></tr>")

        $("#data-view").append(newRow);
      
        }, function(errorObject) {
            console.log("Error: " + errorObject.code);
    });


