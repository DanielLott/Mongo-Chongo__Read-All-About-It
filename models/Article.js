var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var ArticleSchema = new Schema({
	link: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	picSrc: {
		type: String,
		required: true
	}
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;