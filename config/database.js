import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGODB_URL } = process.env;

function connect() {
  // Connecting to the database
  return mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log(
        "Successfully connected to database",
        res.connections[0]._hasOpened
      );
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
}

export default { connect };
