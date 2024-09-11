const express = require("express");
const router = express.Router();

const Admin = require("../models/admin");

router.use(express.json());

router.post("/", async (req, res) => {
  //to get data from body
  const admin = req.body;
  console.log(admin);

  //always use the model that you imported like Admin = require("../models/admin")
  const newAdmin = new Admin(admin);
  console.log(newAdmin);

  try {
    const savedAdmin = await newAdmin.save();
    res.send(JSON.stringify(savedAdmin));
  } catch (e) {
    console.log("cant access post from admin", e);
  }
});

router.get("/", async (req, res) => {
  if (req.query) {
    const admin = await Admin.find({
      name: { $in: "Nawwal Aftab Waseer" },
    });
    // age: { $in: req.query.age },
    // $and: [
    //   { name: req.query.name },
    //   { $or: [{ age: req.query.age }, { gender: req.query.gender }] },
    // ],
    console.log(admin);
    return res.send(admin);
  }
  try {
    const getSimpleAdmin = await Admin.find();
    console.log(JSON.stringify(getSimpleAdmin));
    res.send(getSimpleAdmin);
  } catch (e) {
    console.log("cant get admin from get request", e);
  }
});
//UPADTE DATA
router.put("/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(admin);
    res.send(admin);
  } catch (e) {
    console.log("cannot change data in admin", id, e);
  }
});
//DELETE A ADMIN
router.delete("/:id", async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    console.log(admin);
    if (!admin) {
      console.log("Already deleted");
      res.send("Already deleted");
    } else {
      res.send(admin);
    }
  } catch (e) {
    console.log("cannot delete admin with ", id, e);
  }
});

module.exports = router;
