const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserData,
  validateLogin,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

const upload = multer();

router.post("/", registerUser);
router.post("/login", upload.none(), validateLogin, loginUser);
router.get("/get-user-data", protect, getUserData);

module.exports = router;
