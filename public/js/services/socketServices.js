import { getConversation, currentConversationId } from "./chatServices.js";
import {
  renderNewConversationTap,
  renderNewMessage,
} from "../utils/uiElementsGenerators.js";

function socketHandler(socket) {
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
      renderNewConversationTap(conversation, userId);
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
    window.location.href = "/";
  });
}

export { socketHandler };
