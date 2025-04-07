const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      validate: {
        validator: function (arr) {
          return arr.length === 2 && new Set(arr.map(String)).size === 2;
        },
        message: "Conversation must have exactly 2 unique participants.",
      },
    },
    lastMessage: {
      messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
      content: String,
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      sentAt: Date,
    },
  },
  { timestamps: true },
);

conversationSchema.index({ participants: 1 });

conversationSchema.statics.findBetweenUsers = function (userAId, userBId) {
  return this.findOne({
    participants: { $all: [userAId, userBId] },
  });
};

const Conversation = mongoose.model("conversation", conversationSchema);
const mockConversations = [
  {
    _id: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1b221"),
    participants: [
      new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a111"), // karim
      new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a112"), // ashraf
    ],
    lastMessage: {
      messageId: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1c331"),
      content: "Yo, what's up?",
      senderId: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a111"),
      sentAt: new Date("2025-04-07T12:00:00Z"),
    },
    updatedAt: new Date("2025-04-07T12:00:00Z"),
  },
  {
    _id: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1b222"),
    participants: [
      new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a111"), // karim
      new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a113"), // fahmy
    ],
    lastMessage: {
      messageId: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1c333"),
      content: "Ready for the meeting?",
      senderId: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a113"),
      sentAt: new Date("2025-04-07T13:00:00Z"),
    },
    updatedAt: new Date("2025-04-07T13:00:00Z"),
  },
];

module.exports = {
  mockConversations,
  Conversation,
};
