const express = require("express");

const conversationController = require("../../controllers/conversationController");
const router = express.Router();

router.get("/:conversationId", conversationController.getConversation);

router.post("/:conversationId", conversationController.sendMessage);

module.exports = router;
