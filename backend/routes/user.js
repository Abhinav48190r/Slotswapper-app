const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.get("/profile", authMiddleware, (req, res) => {
  // req.user contains decoded user info from token (like id)
  res.json({ message: `Hello user ${req.user.id}, this is your profile.` });
});

module.exports = router;
