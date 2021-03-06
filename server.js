// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var tables = [
    {
        routeName: "yoda",
        name: "Yoda",
        phone: "888-888-8888",
        email: "yoda@gmail.com",
        uniqueid: "YODA"
    }
];

var waiting = [
    {
        name: "Darth Maul",
        phone: "888-888-8889",
        email: "dm@gmail.com",
        uniqueid: "DARTH"
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservations", function (req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});
// Displays all characters
app.get("/api/reservations", function (req, res) {
    return res.json(tables);
});

app.get("/api/waiting-list", function (req, res) {
    return res.json(waiting);
});


// Create New Characters - takes in JSON input
app.post("/api/reservations", function (req, res) {
    if (tables.length < 5) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newreservation = req.body;

        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html

        console.log(newreservation);

        newreservation.status = "booked";

        tables.push(newreservation);

        res.json(newreservation);
    }

else{
    var newwaiting = req.body;

    newwaiting.status = "wait";

    waiting.push(newwaiting);

    res.json(newwaiting);
}
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
