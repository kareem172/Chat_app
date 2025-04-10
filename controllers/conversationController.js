const { Message } = require("../models/messages");
const { Conversation } = require("../models/conversations");

class ConversationController {
  async getConversation(req, res) {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({
      createdAt: 1,
    });
    res.status(200).json({ data: messages, status: "success" });
  }

  async sendMessage(req, res) {
    const user = req.user;
    const { conversationId } = req.params;
    const { receiverId, content } = req.body;
    const newMessage = new Message({
      conversationId,
      senderId: user._id,
      receiverId,
      content,
      type: "text",
      sentAt: new Date(),
      isRead: false,
    });
    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversationId,
      {
        $set: {
          lastMessage: newMessage,
        },
      },
      { new: true },
    );

    const [message] = await Promise.all([
      newMessage.save(),
      updatedConversation.save(),
    ]);
    res.status(200).json({ data: message, status: "success" });
  }
}

module.exports = new ConversationController();
