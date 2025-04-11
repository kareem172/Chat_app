const { Conversation } = require("../models/conversations");
const { formatConversation } = require("../utils/conversationUtils");
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
      return formatConversation(con, user);
    });
    res.render("chat.ejs", {
      user,
      conversations: formattedConversations,
    });
  }
}

module.exports = new ChatController();
