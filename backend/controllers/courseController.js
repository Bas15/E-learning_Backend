const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Course = require("../models/courseModel");
const User = require("../models/userModel");

// Validation middleware
const validateCourse = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
];

// @desc Get All courses
// @route GET /api/courses
// @access Public
const getAllCourses = asyncHandler(async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
});

// @desc Get courses
// @route GET /api/courses
// @access Private
const getCourses = asyncHandler(async (req, res, next) => {
  try {
    const courses = await Course.find({ user: req.user.id });
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
});

// @desc Set course
// @route POST /api/courses
// @access Private
const setCourse = [
  validateCourse,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const course = await Course.create({
        title: req.body.title,
        description: req.body.description,
        format: req.body.format,
        location: req.body.location,
        currency: req.body.currency,
        price: req.body.price,
        link: req.body.link,
        image: req.body.image,
        user: req.user.id,
        category: req.body.category,
        takeAways: req.body.takeAways,
        audience: req.body.audience,
      });

      res.status(201).json({ success: true, data: course });
    } catch (error) {
      next(error);
    }
  }),
];

// @desc Update course
// @route PUT /api/course/:id
// @access Private
const updateCourse = asyncHandler(async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const user = await User.findById(req.user.id);

    if (!user || course.user.toString() !== user.id) {
      return res
        .status(401)
        .json({ success: false, message: "User not authorized" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    next(error);
  }
});

// @desc Delete course
// @route DELETE /api/course/:id
// @access Private
const deleteCourse = asyncHandler(async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const user = await User.findById(req.user.id);

    if (!user || course.user.toString() !== user.id) {
      return res
        .status(401)
        .json({ success: false, message: "User not authorized" });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: { id: req.params.id } });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getCourses,
  setCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
};
