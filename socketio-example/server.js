const express = require("express");
const socketio = require("socket.io");

const PORT = 8000;

const app = express();

app.use(express.static(__dirname + "/public"));

const server = app.listen(PORT);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log(socket.id, "has connected");

  socket.emit("messageFromServer", { data: "Welcome to the socket server!" });

  socket.on("messageFromClient", (data) => {
    console.log("messageFromClient:", data.message);
  });
});
