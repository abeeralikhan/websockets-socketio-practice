const http = require("http");
const websocket = require("ws");

const server = http.createServer((req, res) => {
  res.end("Hello from HTTP server");
});

const wss = new websocket.WebSocketServer({ server });

server.listen(8000);
