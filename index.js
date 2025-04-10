const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const { createServer } = require("http");

//#region importing routes
// pages routes
const homeRoute = require("./routes/pages/homeRoute");
const signupRoute = require("./routes/pages/signupRoute");
const signinRoute = require("./routes/pages/signinRoute");
const chatRoute = require("./routes/pages/chatRoute");

//api routes
const conversationRoute = require("./routes/api/conversationRoute");
const authRoute = require("./routes/api/authRoute");
//#endregion

//#region importing Middlewares
const authMiddleware = require("./middlewares/authMiddleware");
//#endregion

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const PORT = 5500;

//#region database connection
mongoose.connect("mongodb://127.0.0.1:27017/ChatApp");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
//#endregion

//#region middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(authMiddleware);
app.use(flash());

// setting up locals
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.isAuthenticated = req.isAuthenticated;
  next();
});
//#endregion

//#region page routes
app.use("/", homeRoute);
app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/chat", chatRoute);
//#endregion

//#region Api routes
app.use("/api/conversation", conversationRoute);
app.use("/api/auth", authRoute);
//#endregion

//#region socket.io
io.on("connection", (socket) => {
  console.log("A user connected");
});
//#endregion

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
