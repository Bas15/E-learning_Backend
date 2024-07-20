const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please add a title"],
    },
    description: {
      type: String,
      required: [true, "please add description"],
    },
    format: {
      type: String,
      // required: [true, "please add course format either video/ebook"]
    },
    location: {
      type: String,
      // required: [true, "please add course format either online/offline"]
    },
    currency: {
      type: String,
      required: [true, "please add currency"]
    },
    price: {
      type: Number,
      required: [true, "please add price"],
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
