const express = require("express");
const router = express.Router();
const {
  getCourses,
  setCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
} = require("../controllers/courseController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getCourses).post(protect, setCourse)
router.get('/all-courses', getAllCourses)
router.route("/:id").put(protect, updateCourse).delete(protect, deleteCourse);

module.exports = router;
