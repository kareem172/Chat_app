const express = require("express");
const authController = require("../../controllers/authController");
const router = express.Router();

router.post("/signout", authController.signout);

module.exports = router;
