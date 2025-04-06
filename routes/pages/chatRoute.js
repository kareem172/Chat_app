const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat.ejs", {
    user: req.session.user,
    chats: [],
  });
});

module.exports = router;
