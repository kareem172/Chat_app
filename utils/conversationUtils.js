function formatConversation(conversation, user) {
  const remoteUser = conversation.participants.find(
    (p) => p._id.toString() !== user._id.toString(),
  );
  return {
    conversationId: conversation._id,
    username: remoteUser.username,
    avatar: remoteUser.avatar,
    lastMessage: conversation.lastMessage,
    updatedAt: conversation.updatedAt,
  };
}

module.exports = {
  formatConversation,
};
