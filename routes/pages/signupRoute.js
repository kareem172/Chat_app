const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

router.get("/", (req, res) => {
  res.render("signup.ejs");
});

router.post("/", authController.signup);

module.exports = router;
