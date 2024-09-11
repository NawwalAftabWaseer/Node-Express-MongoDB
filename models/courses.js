const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: Number,
});

module.exports = mongoose.model("Courses", coursesSchema);
