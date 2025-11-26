const mongoose = require("mongoose");

// Task model for CRUD
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Task", TaskSchema);