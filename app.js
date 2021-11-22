import database from "./config/database";
import express from "express";
import RegisterController from "./controller/Register";
import LoginController from "./controller/Login";
import ImageController from "./controller/Image";
// const auth = require("./middlewares/auth");

database.connect();
const app = express();

app.disable("x-powered-by");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/register", RegisterController);
app.use("/login", LoginController);
app.use("/image", ImageController);

app.get("/", (req, res) => {
  const images = [];
  res.status(200).json({
    success: true,
    images: images,
    count: images.length,
  });
});

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

export default app;
