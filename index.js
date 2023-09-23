import express from "express";
import http from "http";
import { Server } from "socket.io";
import DBConnection from "./helper/DBConnection.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/auth.routes.js";
import UserRoute from "./routes/user.routes.js";
import PostRoute from "./routes/post.routes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, 
  })
);

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use("/auth", AuthRoute);
app.use("/profile", UserRoute);
app.use("/post", PostRoute);

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
