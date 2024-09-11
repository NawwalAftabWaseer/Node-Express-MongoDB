const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // always apply MONGOOSE and JOI validations for double check
  //JOI (for validation) -> if invalid body then return error

  //JOI AND MONGOOSE VALIDATION SHOULD MATCH IN ANY CASES
  const schemaJoi = Joi.object({
    name: Joi.string().required().max(10),
    email: Joi.string().optional(),
    password: Joi.string().required().max(5),
    rollNo: Joi.number().optional(),
  });

  //IF RESULT IS CORRECT BY VALIDATION THEN SHOW THE OBJECT ELSE SHOW THE ERROR THAT invalid credentials
  const result = schemaJoi.validate(req.body);
  if (result.error) {
    console.log("CONSOLE ERROR IS", result.error.details[0].message);
    return res.status(400).send("Invalid format of the rqeuest");
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("incorrect email or password");
    }
    const isValid = await bcrypt.compare(password, user.password);
    console.log("valid", isValid);
    if (isValid) {
      // TOKEN GENERATION FOR USER
      const token = jwt.sign(
        // OBJECT OF USER DETAILS-> inki bases pe token bana ke dega
        { _id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET_KEY
      );

      return res.send(token);
    }
  } catch (e) {
    console.log("Error", e);
    return res.send("error" + e);
  }
});

module.exports = router;
