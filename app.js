require("./config/database").connect();
const express = require("express");
const RegisterController = require("./controller/Register");
const LoginController = require("./controller/Login");
const ImageController = require("./controller/Image");
// const auth = require("./middlewares/auth");

const app = express();

app.use(express.json({ limit: "50mb" }));

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

module.exports = app;
