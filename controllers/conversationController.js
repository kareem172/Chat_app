const { Message } = require("../models/messages");
const { Conversation } = require("../models/conversations");
const { User } = require("../models/users");
const { getSocket } = require("../services/socketService");
const { formatConversation } = require("../utils/conversationUtils");
class ConversationController {
  async getConversation(req, res) {
    const user = req.user;
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId).populate(
      "participants",
      "username avatar",
    );
    const formattedConversations = formatConversation(conversation, user);
    res.status(200).json({ data: formattedConversations, status: "success" });
  }

  async getConversationMessages(req, res) {
    const user = req.user;
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
    const remoteUser = await User.findById(
      messages[0].senderId === user._id
        ? messages[0].receiverId
        : messages[0].senderId,
    );
    res.status(200).json({ data: messages, remoteUser, status: "success" });
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

    socket.to(message.receiverId.toString()).emit("newMessage", {
      message,
      conversationId,
    });
    res.status(200).json({ data: message, status: "success" });
  }

  async createConversation(req, res) {
    const user = req.user;
    const { receiverId, message } = req.body;

    let lastMessage = null;
    if (!receiverId || !message) {
      return res.status(400).json({
        message: "Missing required fields",
        status: "failed",
      });
    }
    if (user._id.toString() === receiverId) {
      return res.status(400).json({
        message: "You can't chat with yourself",
        status: "failed",
      });
    }
    const remoteUser = await User.findById(receiverId);
    if (!remoteUser) {
      return res.status(400).json({
        message: "User not found",
        status: "failed",
      });
    }

    const isExist = await Conversation.findOne({
      participants: { $all: [user._id, receiverId] },
    });
    if (isExist) {
      return res.status(400).json({
        message: "Conversation already exists",
        status: "failed",
      });
    }
    const newConversation = new Conversation({
      participants: [user._id, receiverId],
      lastMessage,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    if (message) {
      lastMessage = new Message({
        conversationId: newConversation._id,
        senderId: user._id,
        receiverId,
        content: message,
        type: "text",
        sentAt: new Date(),
        isRead: false,
      });
      lastMessage = await lastMessage.save();
      newConversation.lastMessage = lastMessage;
    }
    await newConversation.save();
    const resConversation = await Conversation.findById(
      newConversation._id,
    ).populate("participants", "username avatar");
    console.log(resConversation.lastMessage);
    const formattedConversation = formatConversation(resConversation, user);
    const remoteFormattedConversation = formatConversation(
      resConversation,
      remoteUser,
    );
    const socket = getSocket();
    socket.to(receiverId).emit("newConversation", {
      conversation: remoteFormattedConversation,
      userId: receiverId,
    });
    res.status(200).json({ data: formattedConversation, status: "success" });
  }
}

module.exports = new ConversationController();
