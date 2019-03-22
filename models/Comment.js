var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new CommentSchema object
// This is similar to a Sequelize model
var CommentSchema = new Schema({
    commentator: {
        type: String,
        required: true
    },
    commentBody: {
        type: String,
        required: true
    },
    // stores the Article id this comment is associated with
    // the "ref" property links the ObjectID to the Article model
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;