// Required modules
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// Server initialization
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//WebSocket connection
io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
