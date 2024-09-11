const mongoose = require("mongoose");
const Joi = require("joi");

//MONGOOSE AND JOI SCHEMA SHOULD MATCH IN ANY CASES

//PATTERN KE DATA KESE AYEGA
const courseSchema = new mongoose.Schema({
  code: String,
  name: String,
  duration: Number,
  description: String,
  fee: Number,
  credits: Number,
});

module.exports = mongoose.model("Courses2", courseSchema);
