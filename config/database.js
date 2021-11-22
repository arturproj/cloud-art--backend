const mongoose = require("mongoose");

const { MONGODB_URL } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("Successfully connected to database", res.connections[0]._hasOpened);
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
