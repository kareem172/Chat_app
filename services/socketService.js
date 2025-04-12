const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

let io = null;

function init(server) {
  io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
    },
    cookie: {
      httpOnly: true,
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN),
    },
  });
  connect();
  return io;
}

function getSocket() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}

function connect() {
  // This middleware handles socket authentication by:
  io.use((socket, next) => {
    // 1. Extracting the JWT token from request cookies
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    // 2. Verifying the token using the JWT_SECRET
    if (!token) return next(new Error("Authentication error"));

    // 3. Storing the user ID from the token in the socket object
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded._id;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.userId;
    socket.join(userId);
    console.log(`user ${userId} connected`);

    socket.on("disconnect", () => {
      socket.leave(userId);
      console.log("user disconnected");
    });
  });
}

module.exports = {
  init,
  getSocket,
};
