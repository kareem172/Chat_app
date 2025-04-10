const { Conversation } = require("../models/conversations");
class ChatController {
  async getAllChats(req, res) {
    if (!req.isAuthenticated) {
      req.flash("toast", "You must be signed in to be able to chat");
      return res.redirect("/signin");
    }
    const user = req.user;
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
    res.render("chat.ejs", {
      user,
      conversations: formattedConversations,
    });
  }
}

module.exports = new ChatController();
