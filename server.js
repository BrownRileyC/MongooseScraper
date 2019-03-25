require('dotenv').config();
var express = require("express");
// var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || process.env.mongoLocalhost;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes

// Home route
app.get('/', function (req, res) {
  db.Article.find({ status: false })
    .then(function (dbArticles) {
      let hbsObject = {
        article: dbArticles
      };
      res.render('index', hbsObject)
    })
});

// Scraper Route
// Add ability to scrape the different types of articles to see more things
app.get('/api/scrape', function (req, res) {
  axios.get("http://dnd.wizards.com/articles").then(function (response) {
    let $ = cheerio.load(response.data);

    $('article div.text').each(function (i, element) {

      console.log($(this));

      let result = {};

      result.headline = $(this).children('h4').text();
      console.log(result);
      result.summary = $(this).children('div').text();
      console.log(result);
      result.link = 'http://dnd.wizards.com'+$(this).children('h4').children('a').attr('href');
      console.log(result);

      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });
    res.send('Scraped Articles Chief')
  });
});

app.put('./api/save/:id', function(req, res) {

})

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});