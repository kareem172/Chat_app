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
  const { data: messages, status, remoteUser } = await response.json();
  if (status === "failed") {
    console.log("🚀 ~ getConversation ~ status:", status);
    return;
  }
  if (messages?.length === 0) return;
  currentConversationId = conversationId;
  currentParticipantId =
    messages[0].senderId === userId
      ? messages[0].receiverId
      : messages[0].senderId;
  if (!currentConversationId || !currentParticipantId) return;
  return { messages, remoteUser };
}

async function sendMessage(message) {
  if (!currentConversationId || !currentParticipantId) return;
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
  const {
    data: newMessage,
    status,
    message: errorMessage,
  } = await response.json();
  if (status === "failed") {
    console.error("🚀 ~ sendMessage ~ status:", status);
    console.error("🚀 ~ sendMessage ~ error Message:", errorMessage);
    return;
  }
  return newMessage;
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

async function createNewConversation(receiverId, message) {
  const baseURL = new URL(window.location.href).origin;
  const response = await fetch(`${baseURL}/api/conversation/newConversation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      receiverId,
      message,
    }),
  });
  const {
    data: newConversation,
    status,
    message: errorMessage,
  } = await response.json();
  if (status === "failed") {
    console.error("🚀 ~ newConversation ~ status:", status);
    console.error("🚀 ~ newConversation ~ error Message:", errorMessage);
    return;
  }
  return newConversation;
}

export {
  getConversationMessages,
  createNewConversation,
  sendMessage,
  getConversation,
  currentConversationId,
  currentParticipantId,
};
