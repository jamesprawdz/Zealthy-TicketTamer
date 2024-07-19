const { hashPassword, comparePassword } = require('../utils/hashUtil');
const { generateToken } = require('../utils/jwtUtil');
const Admin = require("../models/adminModel");
const logDetails = require('../utils/logUtil');

const login = async (req, res) => {
  logDetails("Starting login function...");
  const { userName, userPassword } = req.body;

  try {
    logDetails("Received login data", req.body);
    const admin = await Admin.findOne({ where: { userName } });
    if (!admin) {
      logDetails("Admin not found", { userName });
      return res.status(404).json({ error: "Admin not found" });
    }

    const isPasswordValid = await comparePassword(userPassword, admin.userPassword);
    if (!isPasswordValid) {
      logDetails("Invalid password", { userName });
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = generateToken({ adminId: admin.id, userName: admin.userName }, process.env.JWT_SECRET);
    logDetails("Generated token", { token });

    res.status(200).json({ message: "Login successful", token });
    logDetails("Login response sent");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
};

// Register function for development
const register = async (req, res) => {
  logDetails("Starting register function...");
  const { userName, userPassword } = req.body;

  try {
    logDetails("Received registration data", req.body);
    const hashedPassword = await hashPassword(userPassword);
    const admin = await Admin.create({
      userName,
      userPassword: hashedPassword,
    });
    logDetails("Admin registered", admin.toJSON());

    res.status(201).json({ message: "Admin created successfully", admin });
    logDetails("Registration response sent");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Failed to register admin" });
  }
};

module.exports = { login, register };
