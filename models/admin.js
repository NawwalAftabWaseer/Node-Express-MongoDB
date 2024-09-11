const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  cgpa: Number,
});

module.exports = mongoose.model("Admin", adminSchema);
