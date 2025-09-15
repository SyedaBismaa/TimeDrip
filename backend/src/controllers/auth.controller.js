const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerController(req, res) {
  const { fullName: { firstName, lastName }, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already Exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName: { firstName, lastName },
    email,
    password: hashPassword,
    role: "user", // default role
  });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully!",
    user: {
      email: user.email,
      _id: user._id,
      fullName: user.fullName,
      role: user.role,
    },
  });
}

async function loginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid Email Please try again" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password, try again!" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User LoggedIn successfully!",
    user: {
      email: user.email,
      _id: user._id,
      fullName: user.fullName,
      role: user.role,
    },
  });
}

async function logoutController(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.JWT_SECRET === "production", // only use secure in production
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "User logged out successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while logging out",
      error: error.message,
    });
  }
}


module.exports = {
  registerController,
  loginController,
  logoutController
};
