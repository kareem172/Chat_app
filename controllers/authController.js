const { createUser, findUserByEmail } = require("../models/users");
const { hashPassword } = require("../utils/hash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async signup(req, res) {
    try {
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
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong");
      return res.redirect("/signup");
    }
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await findUserByEmail(email);
      if (!user) throw new Error("User not found");
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error("Invalid password");
      delete user.password;
      const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 86400000
      });
      res.locals.token = token;
      req.flash("toast", "You have successfully signed in");
      res.redirect("/");
    } catch (err) {
      console.log(err);
      req.flash("error", "Invalid email or password");
      return res.redirect("/signin");
    }
  }

  async signout(req, res) {
    res.clearCookie("token");
    req.flash("toast", "You have successfully signed out");
    res.redirect("/");
  }
}

module.exports = new AuthController();
