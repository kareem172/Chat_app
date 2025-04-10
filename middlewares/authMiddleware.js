const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      req.isAuthenticated = true;
    } else {
      req.isAuthenticated = false;
    }
  } catch (err) {
    req.isAuthenticated = false;
  }
  next();
};
