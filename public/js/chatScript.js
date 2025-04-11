import {
  getConversationMessages,
  sendMessage,
  createNewConversation,
} from "./services/chatServices.js";
import { initSocket } from "./services/socketManager.js";
import { socketHandler } from "./services/socketServices.js";
import { renderNewConversationTap } from "./utils/uiElementsGenerators.js";

const socket = initSocket();
socketHandler();

const chatForm = document.getElementById("chat-form");
const textarea = document.getElementById("message");
const conversationTaps = document.querySelectorAll(".conversation-tap");
const userId = document.body.getAttribute("data-user-id");
const dialogBtn = document.getElementById("dialog-btn");
const dialog = document.getElementById("dialog");
const closeDialogBtns = document.querySelectorAll(
  "dialog button[type='cancel']",
);
const newChatForm = document.getElementById("new-chat-form");

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

// Dialog listeners
dialogBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    dialog.close();
  });
});

// New chat form listener (Exist in the dialog)
newChatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("submit");
  const formData = new FormData(newChatForm);
  const receiverId = formData.get("friendId");
  const newMessage = formData.get("dialogMessage");

  if (!receiverId || !newMessage) return;
  const newConversation = await createNewConversation(receiverId, newMessage);
  renderNewConversationTap(newConversation, userId, async () => {
    await getConversationMessages(newConversation.conversationId, userId);
  });
  newChatForm.reset();
  dialog.close();
});
//#endregion

// initialize lucide icons
lucide.createIcons();
