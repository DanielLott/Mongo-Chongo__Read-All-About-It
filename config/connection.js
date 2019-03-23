// Set up Mongoose connection.
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

const connection = mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Export connection for our ORM to use.
module.exports = connection;
