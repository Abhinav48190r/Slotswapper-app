const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/auth");

// Create a new event
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, startTime, endTime, status } = req.body;
    const event = new Event({
      owner: req.user.id,
      title,
      startTime,
      endTime,
      status,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all your events
router.get("/", authMiddleware, async (req, res) => {
  try {
    const events = await Event.find({ owner: req.user.id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update your event
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id }, // user can only update own events
      req.body,
      { new: true }
    );
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete your event
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
