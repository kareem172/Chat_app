const { Conversation } = require("../models/conversations");

class ChatController {
  getAllChats = async (req, res) => {
    const user = req.session.user;
    const conversations = await Conversation.find({
      participants: user._id,
    })
      .populate("participants", "username avatar")
      .sort({ updatedAt: -1 });

    const formattedConversations = conversations.map((con) => {
      const remoteUser = con.participants.find(
        (p) => p._id.toString() !== user._id.toString(),
      );

      return {
        conversationId: con._id,
        username: remoteUser.username,
        avatar: remoteUser.avatar,
        lastMessage: con.lastMessage,
        updatedAt: con.updatedAt,
      };
    });
    console.log(conversations[1].participants);
    res.render("chat.ejs", {
      user,
      conversations: formattedConversations,
    });
  };
}

module.exports = ChatController;
