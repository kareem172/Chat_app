const { createUser, findUserByEmail } = require("../models/users");
const { hashPassword } = require("../utils/hash");

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
}

module.exports = new AuthController();
