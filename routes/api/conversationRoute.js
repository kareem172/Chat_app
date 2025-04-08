const express = require("express");
const { Message } = require("../../models/messages");
const router = express.Router();

router.get("/:conversationId", async (req, res) => {
  const { conversationId } = req.params;
  const messages = await Message.find({ conversationId }).sort({
    createdAt: 1,
  });
  res.status(200).json({ messages });
});

module.exports = router;
