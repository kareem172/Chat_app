import {
  getConversationMessages,
  sendMessage,
  createNewConversation,
} from "./services/chatServices.js";
import { initSocket } from "./services/socketManager.js";
import { socketHandler } from "./services/socketServices.js";
import {
  renderNewConversationTap,
  renderNewMessage,
  renderNewMessages,
} from "./utils/uiElementsGenerators.js";

const socket = initSocket();
socketHandler();

//#region get dom elements
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
//#endregion

//#region listeners
chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const message = formData.get("message");
  if (!message) {
    alert("Please enter a message");
    return;
  }
  const newMessage = await sendMessage(message);
  if (!newMessage) {
    alert("Something went wrong");
    return;
  }
  renderNewMessage(newMessage, true);
  event.target.reset();
});

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
    const messages = await getConversationMessages(conversationId, userId);
    if (!messages) {
      alert("Something went wrong");
      return;
    }
    renderNewMessages(messages, userId);
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
    const messages = await getConversationMessages(
      newConversation.conversationId,
      userId,
    );
    if (!messages) {
      alert("Something went wrong");
      return;
    }
    renderNewMessages(messages, userId);
  });
  newChatForm.reset();
  dialog.close();
});
//#endregion

// initialize lucide icons
lucide.createIcons();
