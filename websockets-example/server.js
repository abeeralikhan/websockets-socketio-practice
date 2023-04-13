const { createServer } = require("http");
const { WebSocketServer } = require("ws");

const PORT = 8080;

const server = createServer((req, res) => {
  console.log("Server hit!");
  res.end("Successfully connected");
});

const wss = new WebSocketServer({ server });

wss.on("headers", (headers, req) => {
  console.log(headers);
});

wss.on("connection", (ws, req) => {
  ws.send("We're now connected");
  ws.on("message", (data) => {
    console.log(data.toString());
  });
  sendNewMessages(ws);
  console.log("The socket connection is open!");
});

const sendNewMessages = (ws) => {
  let count = 1;
  let timerId;
  timerId = setInterval(() => {
    if (count == 10) {
      clearInterval(timerId);
      ws.send(`It was nice talking to you, Tada!`);
      ws.close();
    }
    ws.send(`Message #${count}`);
    count += 1;
  }, 1000);
};

wss.on("close", () => {
  console.log("The socket connection is closed!");
});

server.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
