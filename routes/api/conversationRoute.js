const express = require("express");

const conversationController = require("../../controllers/conversationController");
const router = express.Router();

router.get("/:conversationId", conversationController.getConversation);
router.get(
  "/:conversationId/messages",
  conversationController.getConversationMessages,
);

router.post("/:conversationId/messages", conversationController.sendMessage);

module.exports = router;
