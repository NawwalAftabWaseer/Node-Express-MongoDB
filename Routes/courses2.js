const express = require("express");
const router = express.Router();

const Course2 = require("../models/courses2");

router.use(express.json());

router.post("/", async (req, res) => {
  const course = req.body;

  const newcourse = new Course2(course);

  try {
    const savecourse = await newcourse.save();
    console.log("course saved succressfully");
    res.send(savecourse);
    // console.log(savecourse);
  } catch (e) {
    console.log("cannot save new course", e);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const findCourse = await Course2.findById(req.params.id);
    if (!findCourse) {
      console.log("course not found");
      return res.send("course not found");
    }

    console.log("course found");
    res.send(findCourse);
  } catch (e) {
    console.log("cannot find user with id", id, e);
    res.send("cannot get course");
  }
});

router.get("/", async (req, res) => {
  try {
    const findAllCourses = await Course2.find();
    res.send(findAllCourses);
  } catch (e) {
    console.log("cannot get course", e);
  }
});

module.exports = router;
