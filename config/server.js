require("dotenv").config();
const http = require("http");
const app = require("../app");
const server = http.createServer(app);

const { API_PORT } = process.env;

const port = API_PORT || 5000;

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
