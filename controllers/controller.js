var express = require("express");
var router = express.Router();

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("../models");

// Mongo connection:
const connection = require("../config/connection");

// Create all our routes and set up logic within those routes where required.

// An empty array to save the data that we'll scrape
const latestScrapeURLs = [];

// A GET route for scraping the newsmax website
router.get("/scrape", function (req, res) {
	// HTTP request via axios to grab the HTML body from the site
	axios.get("https://www.newsmax.com/us/").then(function (response) {

		// Load the HTML into cheerio and save it to the "$" constant
		const $ = cheerio.load(response.data);

		// Scanning HTML and extracting elements
		$("li.article_link").each(function () {

			const articleData = {};
			articleData.link = "https://www.newsmax.com" + $(this).find("a").attr("href");
			articleData.title = $(this).find("a").text();
			articleData.summary = $(this).find("div").text();
			articleData.picSrc = "https://www.newsmax.com" + $(this).find("img").attr("src");

			// Create a new Article using the `result` object built from scraping
			db.Article.countDocuments({ link: articleData.link }, (err, count) => {
				if (!err) {
					if (count === 0) {
						db.Article.create(articleData)
							.then(function (dbArticle) {
								// View the added result in the console
								console.log(dbArticle);
							})
							.catch(function (err) {
								// If an error occurred, log it
								// console.log(err);
							});
					}
				}
			});
			// current scraped article's URL saved to array
			latestScrapeURLs.push(articleData.link);


			// console.log(latestScrapeURLs);
			// res.send(latestScrapeURLs);
			// Log the array
		});
	});
	// Send a message to the client
	return res.redirect("/");
});


// Route for getting all Articles from the db
router.get("/", function (req, res) {
	// Grab every document in the Articles collection
	db.Article.find({})
		.then(function (dbArticle) {
			console.log(dbArticle);
			// If we were able to successfully find Articles, send them back to the client
			const hbsObject = {
				articles: dbArticle
			};
			res.render("index", hbsObject);
		})
		.catch(function (err) {
			// If an error occurred, send it to the client
			res.json(err);
		});
});

// Export routes for server.js to use.
module.exports = router;



// Routes

// Route for grabbing a specific Article by id, populate it with it's note
// app.get("/articles/:id", function (req, res) {
// 	// Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
// 	db.Article.findOne({ _id: req.params.id })
// 		// ..and populate all of the notes associated with it
// 		.populate("note")
// 		.then(function (dbArticle) {
// 			// If we were able to successfully find an Article with the given id, send it back to the client
// 			res.json(dbArticle);
// 		})
// 		.catch(function (err) {
// 			// If an error occurred, send it to the client
// 			res.json(err);
// 		});
// });

// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function (req, res) {
// 	// Create a new note and pass the req.body to the entry
// 	db.Note.create(req.body)
// 		.then(function (dbNote) {
// 			// If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
// 			// { new: true } tells the query that we want it to return the updated User -- it returns the original by default
// 			// Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
// 			return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
// 		})
// 		.then(function (dbArticle) {
// 			// If we were able to successfully update an Article, send it back to the client
// 			res.json(dbArticle);
// 		})
// 		.catch(function (err) {
// 			// If an error occurred, send it to the client
// 			res.json(err);
// 		});
// });