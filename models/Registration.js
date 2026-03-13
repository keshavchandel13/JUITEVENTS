const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({

  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },

  userId: String

});

module.exports = mongoose.model("Registration", RegistrationSchema);