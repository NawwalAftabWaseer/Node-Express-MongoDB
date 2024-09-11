const express = require("express");
const router = express.Router();

const Courses = require("../models/courses");

router.use(express.json());

router.post("/", async (req, res) => {
  const Course = req.body;
  console.log(Course);

  const newCourses = new Courses(Course);
  console.log(newCourses);
  try {
    const savedCourses = await newCourses.save();
    res.send(JSON.stringify(savedCourses));
  } catch (e) {
    console.log("cannot get courses", e);
  }
});

router.get("/", async (req, res) => {
  console.log(req.query);
  console.log("after");

  if (req.query.fullName && req.query.email) {
    const courses = await Courses.find({
      fullName: req.query.fullName,
      email: req.query.email,
    })
      .limit(1)
      .select("phoneNumber ");
    console.log(courses);
    res.send(courses);
  }
  try {
    const course = await Courses.find();
    console.log(course);
    res.send(course);
  } catch (e) {
    console.log("cannot access find in courses", e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let courses = await Courses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(courses);
  } catch (e) {
    console.log("error", e);
  }
  res.send("courses put request");
});

router.delete("/:id", async (req, res) => {
  try {
    const course = await Courses.findByIdAndDelete(req.params.id);
    console.log(course);
    if (!course) {
      res.send("already deleted");
    } else {
      res.send(course);
    }
    console.log("deleted suxcessfully");
  } catch (e) {
    console.log("cannot delete object", id, e);
  }
});

module.exports = router;
