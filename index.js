import express from "express";
import http from "http";
import { Server } from "socket.io";
import DBConnection from "./helper/DBConnection.js";
import cors from "cors";
import AuthRoute from "./routes/auth.routes.js";
import bodyParser from "body-parser";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 8000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use("/auth", AuthRoute);

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
