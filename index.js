import express from "express";
import http from "http";
import { Server } from "socket.io";
import DBConnection from "./helper/DBConnection.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

io.on("connection", (socket) => {
  console.log("Connected to web socket");
  io.on("disconnect", (socket) => {
    console.log("A user disconnected");
  });
});

server.listen(port, async () => {
  console.log(`Listening to port ${port}`);
  await DBConnection;
});
