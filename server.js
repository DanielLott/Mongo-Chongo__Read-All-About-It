// requiring npm packages
const express = require("express");
const logger = require("morgan");

const PORT = process.env.PORT || 2112;

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/controller");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
	// Log (server-side) when our server has started
	console.log("Server listening on: http://localhost:" + PORT);
});