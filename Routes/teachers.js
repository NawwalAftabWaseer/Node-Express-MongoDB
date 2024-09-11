const express = require("express");
const router = express.Router();

const Teacher = require("../models/teacher");

const auth = require("../middleware/auth");

router.use(express.json());

router.post("/", async (req, res) => {
  const teacher = req.body;
  console.log(teacher);

  const newTeacher = new Teacher(teacher);
  console.log(newTeacher);
  try {
    const savedTeacher = await newTeacher.save();
    res.send(JSON.stringify(savedTeacher));
  } catch (e) {
    console.log("cannot get teacher", e);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const getTeacher = await Teacher.find();
    res.send(getTeacher);
  } catch (e) {
    console.log("cannot get teacher", e);
  }
});

//ACCESS SPECIFIC DATA FROM OBJECTS
// router.get("/", async (req, res) => {
//   console.log(req.query);
//   if (req.query) {
//     const teacher = await Teacher.find({
//       $and: [
//         { firstName: req.query.firstName },
//         { $or: [{ lastName: req.query.lastName }] },
//       ],
//     });
//     // firstName: { $nin: "Nawwal" },
//     console.log(teacher);
//     return res.send(teacher);
//   }
//   try {
//     const getTeacher = await Teacher.find();
//     res.send(getTeacher);
//   } catch (e) {
//     console.log("cannot get teacher", e);
//   }
// });

//UPADTE DATA IN TEACHER
router.put("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(teacher);
    res.send(teacher);
  } catch (e) {
    console.log("cannot update object in teacher", id, e);
  }
});

//DELETE AN OBJECT FROM TECAHER
router.delete("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    console.log(teacher);
    if (!teacher) {
      console.log("already deleted");
      res.send("already deleted");
    } else {
      console.log(teacher);
      res.send(teacher);
    }
  } catch (e) {
    console.log("cannot delete teacher with", id, e);
  }
});
module.exports = router;
