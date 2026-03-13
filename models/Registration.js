const mongoose = require("mongoose");

const EventRegistrationSchema = new mongoose.Schema({

  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  studentName: String,

  teamName: String,

  teamMembers: [
    {
      name: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("EventRegistration", EventRegistrationSchema);