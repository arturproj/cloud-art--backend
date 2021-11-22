import dotenv from "dotenv";
import http from "http";
import app from "../app";

dotenv.config();

const server = http.createServer(app);
const { API_PORT, API_HOST } = process.env;

const port = API_PORT || 5000;

// server listening
server.listen(port, () => {
  console.log(`Server running on port http://${API_HOST}:${port}`);
});
