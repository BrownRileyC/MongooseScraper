require('dotenv').config();
var express = require("express");
// var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI ||process.env.mongoLocalhost;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
let htmlRoutes = require('./routes/htmlRoutes.js');
let apiRoutes = require('./routes/apiRoutes.js');

htmlRoutes(app);
apiRoutes(app);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});