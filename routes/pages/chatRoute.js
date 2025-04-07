const express = require("express");
const ChatController = require("../../controllers/chatController");
const router = express.Router();

router.get("/", ChatController.getAllChats);

module.exports = router;
