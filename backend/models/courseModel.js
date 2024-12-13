const mongoose = require("mongoose");

const categoryEnum = ["self-paced", "instructor-led"];
const currencyEnum = ["USD", "NGN", "GBP", "EUR"];

const courseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
      required: [true, "please add currency"],
      enum: {
        values: currencyEnum,
        message: "{VALUE} is not a valid currency",
      },
    },
    price: {
      type: Number,
      required: [true, "please add price"],
    },
    link: {
      type: String,
    },
    image: {
      type: String,
      required: [true, "include Course image"],
    },
    category: {
      type: String,
      required: [true, "include a category"],
      enum: {
        values: categoryEnum,
        message: "{VALUE} is not a valid category",
      },
    },
    takeAways: {
      type: [String],
      required: [true, "add Take-aways"],
    },
    audience: {
      type: String,
      required: [true, "include target audience"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
