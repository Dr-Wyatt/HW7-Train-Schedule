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

database.ref().on("child_added", function (child) {
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

$("#submit-button").on("click", function () {
    event.preventDefault();
    var trainLine = $("#trainLine").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();
    var trainTime = moment(firstTrainTime, "HH:mm");
    var nextArrival = 0;
    var minutesAway = 0;
    var secondsAway = 0;

    if (moment().isBefore(trainTime) == false) {
        var numberOfMinutes = (moment().diff(trainTime, 'm')) * -1;
        var numberOfTrains = (numberOfMinutes / frequency) * -1;
        var minutesPassed = (Math.ceil(numberOfTrains) * frequency) * -1;
        minutesAway = numberOfMinutes - minutesPassed;
        var nextarrival = moment().add(minutesAway, 'm');
        nextArrival = moment(nextarrival).format("LT");
    } else {
        nextArrival = moment(trainTime).format("LT");
        secondsAway = (moment().diff(trainTime, 's'))*-1;
        minutesAway = Math.ceil(secondsAway/60);
    }

    var newEmp = {
        trainLine,
        destination,
        firstTrainTime,
        frequency,
        nextArrival,
        minutesAway
    };

    database.ref().push(newEmp);
    $("#train-form")[0].reset();
});