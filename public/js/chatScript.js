async function getConversation(conversationId) {
  const baseURL = new URL(window.location.href).origin;
  const messages = await fetch(`${baseURL}/api/conversation/${conversationId}`);
  console.log(messages);
}
