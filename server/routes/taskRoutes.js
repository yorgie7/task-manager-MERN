const express = require("express");
const Task = require("../models/");
const auth = require("../middleware/auth");
const onlyAdmin = require("../middleware/adminOnly");

const router = express.Router();

// CREATE TASK 
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({
    title,
    description,
    createdBy: req.user._id
  });
  res.json(task);
});

//  GET ALL TASKS 
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find().populate("createdBy", "username");
  res.json(tasks);
});

//  UPDATE TASK 
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
});

// DELETE (ADMIN ONLY)
router.delete("/:id", auth, onlyAdmin, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted by admin" });
});

module.exports = router;
