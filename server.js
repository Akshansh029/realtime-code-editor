// Required modules
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./src/Action");

// Server initialization
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

const getAllConnectedClients = (id) => {
  Array.from(io.sockets.adapter.rooms.get(id)) || [];
};

//WebSocket connection
io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    // Get list of users present in the room
    const clients = getAllConnectedClients(roomId);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
