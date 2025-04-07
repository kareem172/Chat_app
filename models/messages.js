const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String },
    type: {
      type: String,
      enum: ["text", "image", "video", "file"],
      default: "text",
    },
    mediaUrl: String,
    sentAt: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

messageSchema.index({ conversationId: 1, sentAt: -1 });
const Message = mongoose.model("message", messageSchema);

const mockMessages = [
  {
    _id: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1c331"),
    conversationId: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1b221"), // Conversation between karim and ashraf
    senderId: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a111"), // karim
    receiverId: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a112"), // ashraf
    content: "Yo, what's up?",
    type: "text",
    isRead: true,
    sentAt: new Date("2025-04-07T12:00:00Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1c332"),
    conversationId: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1b221"), // Conversation between karim and ashraf
    senderId: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a112"), // ashraf
    receiverId: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a111"), // karim
    content: "All good! You?",
    type: "text",
    isRead: false,
    sentAt: new Date("2025-04-07T12:05:00Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1c333"),
    conversationId: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1b222"), // Conversation between karim and fahmy
    senderId: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a113"), // fahmy
    receiverId: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a111"), // karim
    content: "Ready for the meeting?",
    type: "text",
    isRead: true,
    sentAt: new Date("2025-04-07T13:00:00Z"),
  },
];

module.exports = {
  mockMessages,
  Message,
};
