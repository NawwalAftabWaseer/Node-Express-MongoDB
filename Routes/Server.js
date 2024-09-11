const express = require("express");
const router = express.Router();

const Server = require("../models/server");

router.use(express.json());

//POST TO SEND NEW DATA
router.post("/", async (req, res) => {
  const server = req.body;
  console.log(server);

  const newServer = new Server(server);
  console.log(newServer);

  try {
    const savedServer = await newServer.save();
    console.log(savedServer);
    res.send(savedServer);
  } catch (e) {
    console.log("cant acces post from server", e);
  }
});

//GET TO RETRIEVE WHOLE DATA OF SERVER
// router.get("/", async (req, res) => {
//   try {
//     const findServer = await Server.find();
//     console.log(findServer);
//     res.send(findServer);
//   } catch (e) {
//     console.log("cant get server", e);
//   }
// });

//GET TO RETREIVE DATA WITH SPECIFIC MONGODB ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getIdserver = await Server.findById(id);
    console.log(getIdserver);
    res.send(getIdserver);
  } catch (e) {
    console.log("cant get server id", id, e);
  }
});

//RETRIEVE DATA BY SPECIFIC KEY
router.get("/", async (req, res) => {
  console.log(req.query);
  if (req.query) {
    const server = await Server.find({
      $and: [
        { name: req.query.name },
        { $or: [{ dob: req.query.dob }, { gender: req.query.gender }] },
      ],
    });
    // name: req.query.name,
    // dob: { $eq: req.query.dob },
    console.log(server);
    return res.send(server);
  }
  try {
    const findServer = await Server.find();
    console.log(findServer);
    res.send(findServer);
  } catch (e) {
    console.log("cant get server", e);
  }
});
//UPDATE DATA IN SERVER
router.put("/:id", async (req, res) => {
  try {
    const server = await Server.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(server);
    res.send(server);
  } catch (e) {
    console.log("cannot update server with", id, e);
  }
});

//DELETE A OBJECT IN SERVER
router.delete("/:id", async (req, res) => {
  try {
    const server = await Server.findByIdAndDelete(req.params.id);
    console.log(server);

    if (!server) {
      console.log("already deleted");
      res.send("already deleted");
    } else {
      console.log(server);
      res.send(server);
    }
  } catch (e) {
    console.log("cannot delete server with ", id, e);
  }
});
module.exports = router;
