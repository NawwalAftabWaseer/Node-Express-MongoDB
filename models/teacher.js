const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

module.exports = mongoose.model("Teacher", teacherSchema);
