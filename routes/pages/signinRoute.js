const express = require("express");
const authController = require("../../controllers/authController");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("signin.ejs");
});

router.post("/", authController.signin);

module.exports = router;
