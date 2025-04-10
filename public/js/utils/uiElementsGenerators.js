function createChatBubble(content, isUser = false) {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble");

  if (isUser) bubble.classList.add("sent-message");
  else bubble.classList.add("received-message");

  const contentElement = document.createElement("span");
  contentElement.textContent = content;
  contentElement.classList.add("chat-content");

  bubble.appendChild(contentElement);

  return bubble;
}

function renderMessages(messages, userId) {
  const chatArea = document.getElementById("chat-area");
  chatArea.innerHTML = "";
  messages.forEach((message) => {
    const bubble = createChatBubble(
      message.content,
      message.senderId === userId,
    );
    chatArea.appendChild(bubble);
  });
  scrollToBottom();
}

function scrollToBottom() {
  const chatArea = document.getElementById("chat-area");
  chatArea.scrollTop = chatArea.scrollHeight;
}

function renderNewMessage(message, isUser) {
  const chatArea = document.getElementById("chat-area");
  const bubble = createChatBubble(message.content, isUser);
  bubble.classList.add("new-message");
  chatArea.appendChild(bubble);
  scrollToBottom();
}

function renderNewConversationTap(conversation, userId, eventListener) {
  const conversationTap = document.createElement("div");
  conversationTap.classList.add("conversation-tap");
  conversationTap.setAttribute(
    "data-conversation-id",
    conversation.conversationId,
  );
  conversationTap.setAttribute("data-user-id", userId);

  const avatar = createAvatar(conversation.avatar, conversation.username);
  const infoSection = createConversationInfoSection(
    conversation.username,
    conversation.lastMessage,
  );

  if (!conversation.lastMessage.isRead)
    conversationTap.classList.add("unread-conversation");

  conversationTap.appendChild(avatar);
  conversationTap.appendChild(infoSection);

  const conversationTapsContainer = document.getElementById(
    "conversation-taps-container",
  );
  conversationTap.addEventListener("click", eventListener);
  conversationTapsContainer.insertBefore(
    conversationTap,
    conversationTapsContainer.firstChild,
  );
}

function createAvatar(imgUrl, alt) {
  const avatar = document.createElement("img");
  avatar.src = imgUrl;
  avatar.alt = alt;
  avatar.classList.add("conversation-tap-avatar");
  return avatar;
}

function createConversationInfoSection(username, lastMessage) {
  const infoSection = document.createElement("div");
  infoSection.classList.add("conversation-tap-info");

  const usernameElement = document.createElement("h3");
  usernameElement.textContent = username;

  const lastMessageContainer = document.createElement("div");
  lastMessageContainer.classList.add("conversation-tap-last-message-container");

  const lastMessageElement = document.createElement("span");
  lastMessageElement.textContent = lastMessage.content;
  lastMessageElement.classList.add("conversation-tap-last-message");

  const lastMessageTimeElement = document.createElement("span");
  console.log(lastMessage.sentAt);
  lastMessageTimeElement.textContent = new Date(
    lastMessage.sentAt,
  ).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  lastMessageTimeElement.classList.add("conversation-tap-last-message-time");

  lastMessageContainer.appendChild(lastMessageElement);
  lastMessageContainer.appendChild(lastMessageTimeElement);

  infoSection.appendChild(usernameElement);
  infoSection.appendChild(lastMessageContainer);

  return infoSection;
}

export {
  renderMessages,
  renderNewMessage,
  renderNewConversationTap,
  createAvatar,
  createConversationInfoSection,
  createChatBubble,
  scrollToBottom,
};
