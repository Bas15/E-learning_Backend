const asyncHandler = require("express-async-handler");

const Course = require("../models/courseModel");

// @desc Get courses
// @route Get /api/courses
// @access Private
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();

  res.status(200).json(courses);
});

// @desc set courses
// @route Post /api/courses
// @access Private
const setCourse = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "please add a field" });

    throw new Error("please add a field");
  }

  const course = await Course.create({
    title: req.body.title,
    description: req.body.description,
    format: req.body.format,
    location: req.body.location,
    currency: req.body.currency,
    price: req.body.price,
    link: req.body.link,
  });

  res.status(200).json(course);
});

// @desc Update course
// @route put /api/course/:id
// @access Private
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(400);
    throw new Error("course not found");
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedCourse);
});

// @desc delete course
// @route delete /api/course/:id
// @access Private
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(400);
    throw new Error("course not found");
  }

  await Course.findByIdAndDelete(req.params.id)

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCourses,
  setCourse,
  updateCourse,
  deleteCourse,
};
