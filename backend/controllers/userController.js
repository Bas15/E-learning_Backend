const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");

// Validation middleware
const validateLogin = [
  check("email").isEmail().withMessage("Please include a valid email"),
  check("password").exists().withMessage("Password is required"),
];

const validateRegister = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Please include a valid email"),
  check("phone").notEmpty().withMessage("Phone number is required"),
  check("userName").notEmpty().withMessage("Username is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { firstName, lastName, phone, userName, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    phone,
    userName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400).json({ success: false, message: "Invalid user data" });
  }
});

// @desc Authenticate a user
// @route POST /api/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      success: true,
      data: {
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400).json({ success: false, message: "Invalid credentials" });
  }
});

// @desc Get user data
// @route GET /api/users/get-user-data
// @access Private
const getUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (user) {
    res.status(200).json({ success: true, data: user });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  validateLogin,
  validateRegister,
};
