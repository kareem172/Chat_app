import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

let socketInstance = null;

function initSocket() {
  socketInstance = io({
    withCredentials: true,
  });
  return socketInstance;
}

function getSocket() {
  if (!socketInstance) {
    throw new Error("Socket not initialized");
  }
  return socketInstance;
}

export { initSocket, getSocket };
