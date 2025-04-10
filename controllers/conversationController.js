const { Message } = require("../models/messages");
const { Conversation } = require("../models/conversations");
const { getSocket } = require("../services/socketService");
class ConversationController {
  async getConversation(req, res) {
    const user = req.user;
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId).populate(
      "participants",
      "username avatar",
    );
    console.log(
      "🚀 ~ ConversationController ~ getConversation ~ conversation:",
      conversation.toObject(),
    );
    const remoteUser = conversation.participants.find(
      (p) => p._id.toString() !== user._id.toString(),
    );
    const formattedConversations = {
      conversationId: conversation._id,
      username: remoteUser.username,
      avatar: remoteUser.avatar,
      lastMessage: conversation.lastMessage,
      updatedAt: conversation.updatedAt,
    };
    res.status(200).json({ data: formattedConversations, status: "success" });
  }

  async getConversationMessages(req, res) {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId }).sort({
      createdAt: 1,
    });
    await Message.updateMany(
      {
        conversationId,
        receiverId: user._id,
        isRead: false,
      },
      { $set: { isRead: true } },
    );
    res.status(200).json({ data: messages, status: "success" });
  }

  async sendMessage(req, res) {
    const user = req.user;
    const socket = getSocket();
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
    console.log(
      "🚀 ~ file: conversationController.js:100 ~ message:",
      message.receiverId.toString(),
    );
    socket.to(message.receiverId.toString()).emit("newMessage", {
      message,
      conversationId,
    });
    res.status(200).json({ data: message, status: "success" });
  }
}

module.exports = new ConversationController();
