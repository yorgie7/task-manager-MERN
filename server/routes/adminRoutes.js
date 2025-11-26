const express = require("express");
const auth = require("../middleware/auth");
const onlyAdmin = require("../middleware/adminOnly");

const router = express.Router();

// MAKE USER ADMIN
router.put("/make-admin/:username", auth, onlyAdmin, async (req, res) => {
  const { username } = req.params;

  await User.updateOne({ username }, { $set: { role: "admin" } });

  res.json({ message: `${username} is now admin` });
});

module.exports = router;
