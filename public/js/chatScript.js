import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
import {
  getConversationMessages,
  sendMessage,
} from "./services/chatServices.js";
import { socketHandler } from "./services/socketServices.js";
const socket = io();

socket.on("connect", () => {
  socketHandler(socket);
});

const chatForm = document.getElementById("chat-form");
const textarea = document.getElementById("message");
const conversationTaps = document.querySelectorAll(".conversation-tap");

//#region listeners
chatForm.addEventListener("submit", sendMessage);

// Prevent newline without shift key
textarea.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

conversationTaps.forEach((tap) => {
  tap.addEventListener("click", async () => {
    const conversationId = tap.getAttribute("data-conversation-id");
    const userId = tap.getAttribute("data-user-id");
    await getConversationMessages(conversationId, userId);
  });
});
