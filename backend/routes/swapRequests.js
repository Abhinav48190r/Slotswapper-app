const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const SwapRequest = require("../models/SwapRequest");
const Event = require("../models/Event");

// Create a new swap request
router.post("/", authMiddleware, async (req, res) => {
  const { eventId, requestedUserId } = req.body;
  try {
    const newRequest = new SwapRequest({
      requester: req.user.id,
      event: eventId,
      requestedUser: requestedUserId,
    });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all swap requests for the current user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const requests = await SwapRequest.find({ requester: req.user.id })
      .populate("event")
      .populate("requestedUser", "username email");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update swap request status (accept/reject) and update event ownership/status
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id)
      .populate("event")
      .populate("requestedUser");

    if (!swapRequest) {
      return res.status(404).json({ error: "SwapRequest not found" });
    }

    const { status } = req.body;
    swapRequest.status = status; // "accepted" or "rejected"

    if (status === "accepted") {
      // Find events owned by requester and requestedUser
      const requesterEvent = await Event.findOne({
        owner: swapRequest.requester,
        _id: swapRequest.event._id,
      });
      const requestedUserEvent = await Event.findOne({
        owner: swapRequest.requestedUser._id,
        _id: swapRequest.event._id,
      });

      // Swap owners of the events
      if (requesterEvent && requestedUserEvent) {
        const tempOwner = requesterEvent.owner;
        requesterEvent.owner = requestedUserEvent.owner;
        requestedUserEvent.owner = tempOwner;

        // Update event statuses
        requesterEvent.status = "BUSY";
        requestedUserEvent.status = "BUSY";

        await requesterEvent.save();
        await requestedUserEvent.save();
      }
    } else if (status === "rejected") {
      // Reset event status to SWAPPABLE
      await Event.findByIdAndUpdate(swapRequest.event._id, {
        status: "SWAPPABLE",
      });
      // Optionally reset requestedUser event status too, if known
    }

    await swapRequest.save();
    res.json(swapRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
