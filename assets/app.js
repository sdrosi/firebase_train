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
  var nextTrain = "";
  var nextTrainFormatted = "";
  var minutesAway = "";
  var timeConverted = "";
  var currentTime = "";
  var difTime = "";
  var tRemainder = "";
  var minutesTilTrain = "";
  
  //capture the data, yo
$(document).ready(function(){
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

    //logic for train times using moment.js

    timeConverted = moment(time, "hh:mm").subtract(1, "years");
    console.log(timeConverted);
    curentTime = moment();
    console.log(currentTime);
    diffTime = moment().diff(moment(timeConverted), "minutes");
    console.log(diffTime);
    tRemainder = diffTime % frequency;
    console.log(tRemainder);
    minutesTilTrain = frequency - tRemainder;
    console.log(minutesTilTrain);
    nextTrain = moment().add(minutesTilTrain, "minutes");
    console.log(nextTrain);
    nextTrainFormatted = moment(nextTrain).format("hh:mm");
    console.log(nextTrainFormatted);

    database.ref().push({
        trainName : trainName,
        destination : destination,
        frequency : frequency,
        time : time,
        nextTrainFormatted : nextTrainFormatted,
        minutesTilTrain: minutesTilTrain
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

        var nextDis = childSnapshot.val().nextTrainFormatted;
        console.log(childSnapshot.val().nextTrainFormatted);
        
        var minDis = childSnapshot.val().minutesTilTrain;
        console.log(childSnapshot.val().minutesTilTrain);

        var newRow = $("<tr><td>" + nameDis + "</td><td>" + destinationDis + "</td><td>" + frequencyDis + "</td><td>" + nextDis + "</td><td>" + minDis + "</td></tr>")

        $("#data-view").append(newRow);
      
        }, function(errorObject) {
            console.log("Error: " + errorObject.code);
    });

});
