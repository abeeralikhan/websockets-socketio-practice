const { createServer } = require("http");
const { WebSocketServer } = require("ws");

const server = createServer((req, res) => {
  res.end("Hello from HTTP server");
});

// wss --> Websocket Server
const wss = new WebSocketServer({ server });

wss.on("headers", (headers, req) => {
  // This runs when the handshake is in process
  // We can customize the headers
  console.log(headers);
});

// Websocket Server (wss) --> Websocket (ws)
// connection --> open
wss.on("connection", (ws, req) => {
  // This runs when the connection is established
  // Handshake is completed
  ws.send("Welcome to the server!!");

  // Once the connection is established
  // we can start listening to messages from the server
  ws.on("message", (data) => {
    console.log(data.toString());
  });
});

server.listen(8000);
