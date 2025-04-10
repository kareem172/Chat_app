import {
  getConversation,
  currentConversationId,
  getConversationMessages,
} from "./chatServices.js";
import {
  renderNewConversationTap,
  renderNewMessage,
} from "../utils/uiElementsGenerators.js";
import { getSocket } from "./socketManager.js";
function socketHandler() {
  const socket = getSocket();
  socket.on("connect", () => {
    console.log("Connected to server");
  });
  socket.on("newMessage", async ({ message, conversationId }) => {
    if (conversationId === currentConversationId) {
      renderNewMessage(message, false);
      return;
    }
    const tap = document.querySelector(
      `.conversation-tap[data-conversation-id="${conversationId}"]`,
    );
    if (tap) {
      const userId = tap.getAttribute("data-user-id");
      const conversation = await getConversation(conversationId);
      console.log("🚀 ~ socket.on ~ conversation:", conversation);
      tap.remove();
      renderNewConversationTap(conversation, userId, async () => {
        await getConversationMessages(conversationId, userId);
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
    window.location.href = "/";
  });
}

export { socketHandler };
