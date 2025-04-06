const { createUser, findUserByEmail } = require("../models/users");
const { hashPassword } = require("../utils/hash");
const bcrypt = require("bcrypt");

class AuthController {
  async signup(req, res) {
    const { username, email, password } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      req.flash("error", "User with the provided email already exists");
      return res.redirect("/signup");
    }
    const newUser = await createUser(
      username,
      email,
      await hashPassword(password),
    );
    if (!newUser) {
      req.flash("error", "Something went wrong");
      return res.redirect("/signup");
    }

    res.redirect("/signin");
  }

  async signin(req, res) {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      req.flash("error", "User with the provided email does not exist");
      return res.redirect("/signin");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      req.flash("error", "Invalid password");
      return res.redirect("/signin");
    }
    delete user.password;
    req.session.user = user;
    req.flash("success", "You have successfully signed in");
    res.redirect("/");
  }
}

module.exports = new AuthController();
