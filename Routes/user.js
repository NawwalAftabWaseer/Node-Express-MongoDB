const express = require("express");
const course = require("./courses2");

//IMPORT USER MDOEL
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
// IMPORT AUTJ.JS MIDDLE-WARE THAT WE CREATED
// const auth = require("../middleware/auth"); WRITE AUTH IN GET

const router = express.Router();

//ROUTE PARAMETERS

//SAVE DATASET CTREATED By OURSELVES
// router.post("/", async (req, res) => {
//   const user = req.body;
//   console.log(user);

//   //CONSTRUCTOR CALL OR A METHOD CALL
//   const newUser = new User(user);
//   console.log(newUser);
//   try {
//     const savedUser = await newUser.save();
//     res.send(JSON.stringify(savedUser));
//   } catch (error) {
//     console.log("Error", error);
//     res.send("error creating user");
//   }
// });

//AUTH MEANS NEXT function WILL RUN ON ASYNC(REQ,RES)
//AGR USER NE LOGIN KYA HUWA HAI TO SAB USERS KI LIST DEKH SAKTA HAI
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("course"); //.populate provides all attributes of courses
    console.log(users);
    res.send(users);
  } catch (e) {
    console.log("error fetching user", e);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    console.log(user);
    return res.send(user);
  } catch (e) {
    console.log("error fetching user", id, e);
  }
});
// THURSDAY 29 AUGUST
//GET DATA BY SPECIFIC KEY IN DATABASE
// router.get("/", async (req, res) => {
//   console.log(req.query);
//   console.log("after");

//   if (req.query) {
//     const users = await User.find({
//       //FRIDAY 30 AUGUST
//       $and: [
//         { name: req.query.name },
//         { $or: [{ password: req.query.password }, { email: req.query.email }] },
//       ],
//       // rollNo: { $eq: req.query.rollNo },x`
//       //name: {$nin: ["nawwal"]} -->will not show any objects
//     });
//     //select({name:1, email:1})
//     console.log(users);
//     return res.send(users);
//   }
//   try {
//     const users = await User.find();
//     console.log(users);
//     res.send(users);
//   } catch (e) {
//     console.log("error fetching user", e);
//   }
// });

// UPDATE METHODS
router.put("/:id/:courseid", async (req, res) => {
  // const id = req.query.id;
  //NESTED DOCUMENTS

  // SHOW WITHOUT MONGO DB ID
  // console.log("hwloooooooooooooooooo");
  console.log(req.params);
  //JOI VALIDATION

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.send("user not found");
    }
    //.course should be same as name written in user schema
    user.course.push(req.params.courseid);
    const updatedUser = await user.save();

    return res.send(updatedUser);
    //agr ham NEW ni sue krenge still wo update krdega DB me but terminal me ni
    // let user = await User.findById(id);
    // if (!user) {
    //   return res.send("user not found");
    // }
    // if (req.body.course) {
    //   user.course.push(req.body.course);
    // }
    // const updatedUser = await user.save();
    // return res.send(updatedUser);
  } catch (e) {
    console.log("error", e);
    return res.send("its an error");
  }
});

// DELETE ANY SPECIFIC USER
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    console.log(user);
    if (!user) {
      res.send("already deleted");
    } else {
      res.send(user);
    }
  } catch (e) {
    console.log("already deleted", e);
  }
});

/// USER SIGNUP
router.post("/", async (req, res) => {
  // bcrypt an algorithm to store passwords by usinf HASHING
  const user = req.body;

  //JOI VALIDATION BY FUNCTION CALL FROM user.model
  const { error } = validate(user);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    // before save checks that if user exists or not on basis of email
    const dbUser = await User.findOne({ email: user.email });
    if (dbUser) {
      return res.send("User already exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      // console.log("salt", salt);
      // console.log(user);
      // res.send(user);
      const newUser = new User(user);
      console.log(newUser);
      const savedUser = await newUser.save();
      return res.send(savedUser);
    }
  } catch (e) {
    console.log("error catching error", e);
    return res.send(e);
  }
});

module.exports = router;
