import {
  renderMessages,
  renderNewMessage,
} from "../utils/uiElementsGenerators.js";

let currentConversationId = null;
let currentParticipantId = null;

async function getConversationMessages(conversationId, userId) {
  const conversationTap = document.querySelector(
    `.conversation-tap[data-conversation-id="${conversationId}"]`,
  );
  if (conversationTap) {
    conversationTap.classList.remove("unread-conversation");
  }
  const baseURL = new URL(window.location.href).origin;
  const response = await fetch(
    `${baseURL}/api/conversation/${conversationId}/messages`,
  );
  const { data: messages, status } = await response.json();
  if (status === "failed") {
    console.log("🚀 ~ getConversation ~ status:", status);
    return;
  }
  if (messages?.length === 0) return;
  currentConversationId = conversationId;
  currentParticipantId = messages.find((m) => m.senderId !== userId).senderId;

  renderMessages(messages, userId);
}

async function sendMessage(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const message = formData.get("message");
  if (!message || !currentConversationId || !currentParticipantId) {
    alert("Please enter a message");
    return;
  }

  const baseURL = new URL(window.location.href).origin;
  const response = await fetch(
    `${baseURL}/api/conversation/${currentConversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message.toString(),
        receiverId: currentParticipantId,
      }),
    },
  );
  const { data: newMessage } = await response.json();
  if (!newMessage) return;
  renderNewMessage(newMessage, true);
  event.target.reset();
}

async function getConversation(conversationId) {
  const baseURL = new URL(window.location.href).origin;
  const response = await fetch(`${baseURL}/api/conversation/${conversationId}`);
  const { data: conversation, status } = await response.json();
  if (status === "failed") {
    console.error("🚀 ~ getConversation ~ status:", status);
    return;
  }
  return conversation;
}

export {
  getConversationMessages,
  sendMessage,
  getConversation,
  currentConversationId,
  currentParticipantId,
};
