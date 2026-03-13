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




router.get("/events/upcoming", async (req, res) => {

  try {

    const events = await Event.find({
      startDate: { $gte: new Date() }
    }).sort({ startDate: 1 });

    res.json(events);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

});
router.post("/events/register", async (req, res) => {

  try {

    const { eventId, studentName, teamName, teamMembers } = req.body;

    const registration = new Registration({
      eventId,
      studentName,
      teamName,
      teamMembers
    });

    await registration.save();

    res.json({
      message: "Registration successful"
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Registration failed"
    });

  }

});
router.get("/events/:id", async (req, res) => {

  const event = await Event.findById(req.params.id);

  res.json(event);

});
router.get("/admin/event-registrations", async (req, res) => {

  try {

    const data = await Registration.aggregate([

      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event"
        }
      },

      { $unwind: "$event" },

      {
        $group: {
          _id: "$eventId",
          eventTitle: { $first: "$event.title" },
          students: {
            $push: {
              studentName: "$studentName",
              teamName: "$teamName",
              teamMembers: "$teamMembers"
            }
          }
        }
      }

    ]);

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch registrations"
    });

  }

});




module.exports = router;