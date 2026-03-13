const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const Registration = require("../models/Registration");


/* Create Event */
router.post("/create-event", async (req, res) => {

  try {

    const event = new Event(req.body);
    await event.save();

    res.json(event);

  } catch (error) {
    res.status(500).json(error);
  }

});


/* Get All Events */
router.get("/events", async (req, res) => {

  const events = await Event.find();
  res.json(events);

});


/* Get Registration Count */
router.get("/registration-count", async (req, res) => {

  const counts = await Registration.aggregate([
    {
      $group: {
        _id: "$eventId",
        count: { $sum: 1 }
      }
    }
  ]);

  res.json(counts);

});
router.post("/event/:id/coming", async (req, res) => {

  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { $inc: { weAreComingCount: 1 } },
    { new: true }
  );

  res.json(event);

});

module.exports = router;