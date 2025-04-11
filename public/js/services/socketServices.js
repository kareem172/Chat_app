import {
  getConversation,
  currentConversationId,
  getConversationMessages,
} from "./chatServices.js";
import {
  renderNewConversationTap,
  renderNewMessage,
  updateConversationTap,
} from "../utils/uiElementsGenerators.js";
import { getSocket } from "./socketManager.js";
import { handleTapClick } from "../chatScript.js";
function socketHandler() {
  const socket = getSocket();
  socket.on("connect", () => {
    console.log("Connected to server");
  });
  socket.on("newMessage", async ({ message, conversationId }) => {
    if (conversationId === currentConversationId) {
      renderNewMessage(message, false);
      updateConversationTap(conversationId, message, async () => {
        await handleTapClick(conversationId, message.receiverId);
      });
      return;
    }
    const tap = document.querySelector(
      `.conversation-tap[data-conversation-id="${conversationId}"]`,
    );
    if (tap) {
      const userId = tap.getAttribute("data-user-id");
      const conversation = await getConversation(conversationId);
      tap.remove();
      renderNewConversationTap(conversation, userId, async () => {
        await handleTapClick(conversationId, message.receiverId);
      });
    }
  });

  socket.on("newConversation", async ({ conversation, userId }) => {
    renderNewConversationTap(conversation, userId, async () => {
      await getConversationMessages(conversation.conversationId, userId);
    });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
    window.location.href = "/";
  });
}

export { socketHandler };
