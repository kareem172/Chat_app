const express = require("express");
const router = express.Router();

const { createUser, findUserByEmail } = require("../../models/users");
const { hashPassword } = require("../../utils/hash");
router.get("/", (req, res) => {
  res.render("signup.ejs");
});

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    return res.status(400).json({ error: "Email already exists" });
  }
  const newUser = await createUser(
    username,
    email,
    await hashPassword(password),
  );

  res.redirect("/signin");
});

module.exports = router;
