const express = require("express");
const { Task } = require("../models");
const auth = require("../middleware/auth");
const onlyAdmin = require("../middleware/adminOnly");

const router = express.Router();

// CREATE TASK 

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const createdBy = req.user?.id;
    if (!title) return res.status(401).json({ message: 'Title is required' });
    if (!createdBy) return res.status(401).json({ message: 'Unauthenticated' });

    const task = await Task.create({ title, description, status, createdBy });
    res.status(201).json(task);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
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
