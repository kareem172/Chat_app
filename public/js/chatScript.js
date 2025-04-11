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
  renderMessages,
  updateConversationTap,
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
const copyIdBtn = document.getElementById("copy-id-btn");
//#endregion

//#region listeners
export async function handleTapClick(conversationId, userId) {
  const messages = await getConversationMessages(conversationId, userId);
  if (!messages) {
    alert("Something went wrong");
    return;
  }
  renderMessages(messages, userId);
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Get message
  const formData = new FormData(event.target);
  const message = formData.get("message");
  if (!message) {
    alert("Please enter a message");
    return;
  }
  // Send message
  const newMessage = await sendMessage(message);
  if (!newMessage) {
    alert("Something went wrong");
    return;
  }
  // Render message
  renderNewMessage(newMessage, true);
  // Reset form
  event.target.reset();

  // update conversation tap
  updateConversationTap(newMessage.conversationId, newMessage, async () => {
    await handleTapClick(newMessage.conversationId, userId);
  });
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
    await handleTapClick(conversationId, userId);
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
// Copy user ID functionality
copyIdBtn.addEventListener("click", async () => {
  const userId = document.body.getAttribute("data-user-id");
  try {
    await navigator.clipboard.writeText(userId);
    copyIdBtn.classList.add("bg-green-100");
    copyIdBtn.querySelector("span").textContent = "Copied!";
    setTimeout(() => {
      copyIdBtn.classList.remove("bg-green-100");
      copyIdBtn.querySelector("span").textContent = `Copy your ID`;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy ID:", err);
    alert("Failed to copy ID to clipboard");
  }
});

newChatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(newChatForm);
  const receiverId = formData.get("friendId");
  const newMessage = formData.get("dialogMessage");

  if (!receiverId || !newMessage) return;
  const newConversation = await createNewConversation(receiverId, newMessage);
  renderNewConversationTap(newConversation, userId, async () => {
    await handleTapClick(newConversation.conversationId, userId);
  });
  newChatForm.reset();
  dialog.close();
});
//#endregion

// initialize lucide icons
lucide.createIcons();
