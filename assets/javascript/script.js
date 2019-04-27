var config = {
    apiKey: "AIzaSyChlfSbNU7c00-40ietEfoQjIeLseUAC-g",
    authDomain: "flame-on-7627d.firebaseapp.com",
    databaseURL: "https://flame-on-7627d.firebaseio.com",
    projectId: "flame-on-7627d",
    storageBucket: "flame-on-7627d.appspot.com",
    messagingSenderId: "321288081814"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  database.ref().on("child_added", function(child){
    var tBody = $("tbody");
    var tRow = $("<tr>");
    var trainLineTd = $("<td>").text(child.val().trainLine);
    var destinationTd = $("<td>").text(child.val().destination);
    var frequencyTd = $("<td>").text(child.val().frequency);
    var nextArrivalTd = $("<td>").text(child.val().nextArrival);
    var minutesAwayTd = $("<td>").text(child.val().minutesAway);
    tRow.append(trainLineTd, destinationTd, frequencyTd, nextArrivalTd, minutesAwayTd);
    tBody.append(tRow);
    $("table").append(tBody);


});

$("#submit-button").on("click", function(){
    event.preventDefault();
    var trainLine = $("#trainLine").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    console.log("firstTrainTime", firstTrainTime);
    var frequency = $("#frequency").val().trim();
    var trainTime = moment(firstTrainTime, "HH:mm");
    console.log("traintime", trainTime);
    var numberOfMinutes = moment.duration(trainTime.diff(moment())*-1).as('minutes');
    console.log("number of minutes", numberOfMinutes);        
    var numberOfTrains = numberOfMinutes/frequency;
    console.log("number of trains", numberOfTrains);
    var lastTrainMinutes = moment(Math.floor(numberOfTrains)*frequency, 'm');
    console.log("most recent train in minutes", lastTrainMinutes);
    var lastTrainTime = lastTrainMinutes.add(trainTime);
    console.log("lastTrainTime", lastTrainTime);
    var nextArrival = 10;
    var minutesAway = 10;
    
    var newEmp = {
        trainLine,
        destination,
        firstTrainTime,
        frequency,
        nextArrival,
        minutesAway
    };

    database.ref().push(newEmp);
});