const mongoose = require("mongoose");
const { hashPassword } = require("../utils/hash");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    status: { type: String, enum: ["online", "offline"], default: "offline" },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

const createUser = async (name, email, password, avatar) => {
  const user = new User({
    username: name,
    email,
    password,
    avatar:
      avatar ||
      "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
  });
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

const mockUsers = [
  {
    _id: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a111"),
    username: "karim",
    password: "$2b$10$uS7mdLQtHXH8WpNxK0kQYuU5A2yQNJyGfDv4v7qHTeVJIKp5lCrAq",
    email: "karim@example.com",
    avatar: "https://i.pravatar.cc/150?u=karim",
    status: "offline",
  },
  {
    _id: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a112"),
    username: "ashraf",
    password: "$2b$10$uS7mdLQtHXH8WpNxK0kQYuU5A2yQNJyGfDv4v7qHTeVJIKp5lCrAq",
    email: "ashraf@example.com",
    avatar: "https://i.pravatar.cc/150?u=ashraf",
    status: "offline",
  },
  {
    _id: new mongoose.Types.ObjectId("66131e121b1b9a01f1a1a113"),
    username: "fahmy",
    password: "$2b$10$uS7mdLQtHXH8WpNxK0kQYuU5A2yQNJyGfDv4v7qHTeVJIKp5lCrAq",
    email: "fahmy@example.com",
    avatar: "https://i.pravatar.cc/150?u=fahmy",
    status: "offline",
  },
];

module.exports = {
  User,
  createUser,
  findUserByEmail,
  findUserById,
  isUserExist,
  mockUsers,
};
