const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  name: String,
  dob: Number,
  gender: String,
});

module.exports = mongoose.model("Server", serverSchema);
