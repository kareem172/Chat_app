const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const createUser = async (name, email, password) => {
  const user = new User({ name, email, password });
  return await user.save();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const isUserExist = async (email) => {
  const user = await User.findOne({ email });
  return user ? true : false;
};

module.exports = {
  User,
  createUser,
  findUserByEmail,
  findUserById,
  isUserExist,
};
