const mongoose = require("mongoose");
const Joi = require("joi");
const courseSchema = require("./courses2").schema;

//MONGOOSE AND JOI SCHEMA SHOULD MATCH IN ANY CASES

//PATTERN KE DATA KESE AYEGA
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: String,
  rollNo: { type: Number, required: true },
  course: [
    {
      //ID KI MONGOOSE WALI TYPE
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses2", //this name is same as the name you exported the model of courses2 with
    },
  ],
});
// FUNCTION
const validateUser = (user) => {
  const schemaUser = Joi.object({
    name: Joi.string().min(2).max(20).lowercase().required(),
    email: Joi.string()
      .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      .optional(),
    password: Joi.string(),
    rollNo: Joi.number().required(),
  });

  return schemaUser.validate(user);
};

module.exports = {
  User: mongoose.model("User", userSchema),
  validate: validateUser,
};
