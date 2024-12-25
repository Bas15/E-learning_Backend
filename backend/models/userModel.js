const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please add a Firstname"],
    },
    lastName: {
      type: String,
      required: [true, "please add a Lastname"],
    },
    phone: {
      type: String,
      required: [true, "please add a phone number"],
    },
    userName: {
      type: String,
      required: [true, "please add a userName"],
    },
    email: {
      type: String,
      required: [true, "please add email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please add a password"],
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
