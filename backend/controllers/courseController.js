// @desc Get courses
// @route Get /api/courses
// @access Private
const getCourses = (req, res) => {
  res.status(200).json({ message: "Get courses" });
};

// @desc set courses
// @route Post /api/courses
// @access Private
const setCourse = (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: "please add a text field" });

    throw new Error("please add a new text field");
  }

  res.status(200).json({ message: "SET Courses" });
};

// @desc Update course
// @route put /api/course/:id
// @access Private
const updateCourse = (req, res) => {
  res.status(200).json({ message: `update courses ${req.params.id}` });
};

// @desc delete course
// @route delete /api/course/:id
// @access Private
const deleteCourse = (req, res) => {
  res.status(200).json({ message: `delete courses ${req.params.id}` });
};

module.exports = {
  getCourses,
  setCourse,
  updateCourse,
  deleteCourse,
};
