let currentConversationId = null;
let currentParticipantId = null;

const chatForm = document.getElementById("chat-form");
const textarea = document.getElementById("message");

//#region listeners
chatForm.addEventListener("submit", sendMessage);

// Prevent newline without shift key
textarea.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});
//#endregion

async function getConversation(conversationId, userId) {
  console.log("🚀 ~ getConversation ~ userId:", userId);

  const baseURL = new URL(window.location.href).origin;
  console.log("fetching", conversationId);
  const response = await fetch(`${baseURL}/api/conversation/${conversationId}`);
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
    `${baseURL}/api/conversation/${currentConversationId}`,
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
