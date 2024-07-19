const jwt = require('jsonwebtoken');
const logDetails = require('../utils/logUtil');

const generateToken = (payload, secret) => {
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  logDetails("JWT token generated successfully", { token });
  return token;
};

const verifyToken = async (token, secret) => {
  try {
    const decoded = await jwt.verify(token, secret);
    logDetails("JWT token verified successfully", { decoded });
    return decoded;
  } catch (error) {
    logDetails("Error verifying JWT token", { error });
    throw error;
  }
};

module.exports = { generateToken, verifyToken };
