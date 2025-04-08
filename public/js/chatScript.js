async function getConversation(conversationId, userId) {
  console.log("🚀 ~ getConversation ~ userId:", userId);

  const baseURL = new URL(window.location.href).origin;
  console.log("fetching", conversationId);
  const response = await fetch(`${baseURL}/api/conversation/${conversationId}`);
  const { messages } = await response.json();
  console.log("🚀 ~ getConversation ~ messages:", messages);
  if (!messages) return;
  if (messages?.length === 0) return;
  renderMessages(messages, userId);
}

function createChatBubble(content, isUser = false) {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble");

  if (isUser) bubble.classList.add("sent-message");
  else bubble.classList.add("received-message");

  const contentElement = document.createElement("span");
  contentElement.textContent = content;

  bubble.appendChild(contentElement);

  return bubble;
}

function renderMessages(messages, userId) {
  const chatArea = document.getElementById("chat-area");
  chatArea.innerHTML = "";
  messages.forEach((message) => {
    console.log(message.senderId, userId);
    const bubble = createChatBubble(
      message.content,
      message.senderId === userId,
    );
    chatArea.appendChild(bubble);
  });
}
