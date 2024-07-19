const { verifyToken } = require('../utils/jwtUtil');
const logDetails = require('../utils/logUtil');

const authenticate = async (req, res, next) => {
  logDetails("Starting authentication middleware...");
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    logDetails("No token provided");
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = await verifyToken(token, process.env.JWT_SECRET);
    req.user = decoded;
    logDetails("Token verified", decoded);
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = { authenticate };
