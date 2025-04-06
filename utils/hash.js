const bcrypt = require("bcrypt");

const generateSalt = async () => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return salt;
  } catch (err) {
    throw new Error(`Salt generation error: ${err}`);
  }
};
const hashPassword = async (password) => {
  try {
    // Hash the password with the provided salt
    const hashedPassword = await bcrypt.hash(password, await generateSalt());
    return hashedPassword;
  } catch (error) {
    throw new Error("Hashing failed");
  }
};

module.exports = { hashPassword };
