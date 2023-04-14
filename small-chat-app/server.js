const express = require("express");
const socketio = require("socket.io");

const PORT = 8001;

const app = express();

app.use(express.static(__dirname + "/public"));

// express server
const server = app.listen(PORT);

// socketio server
const io = socketio(server);

io.on("connection", (socket) => {
  console.log(socket.id);

  // Listening to individual sockets
  socket.on("newMessageFromClient", (data) => {
    // Broadcasting a message to all connected sockets
    io.emit("newMessageFromServer", { text: data.text, id: data.id });
  });
});
