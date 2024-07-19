const bcrypt = require("bcryptjs");
const logDetails = require('../utils/logUtil');

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    logDetails("Password hashed successfully", { hashedPassword });
    return hashedPassword;
  } catch (error) {
    logDetails("Error hashing password", { error });
    throw error;
  }
};

const comparePassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    logDetails("Password comparison result", { isMatch });
    return isMatch;
  } catch (error) {
    logDetails("Error comparing password", { error });
    throw error;
  }
};

module.exports = { hashPassword, comparePassword };
