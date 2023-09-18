import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(port, () => [console.log(`Listening to port ${port}`)]);

io.on("connection", (socket) => {
  console.log("Connected to web socket");
  io.on("disconnect", (socket) => {
    console.log("A user disconnected");
  });
});
