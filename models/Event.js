const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  location: {
    type: String
  },

  type: {
    type: String
  },

  image: {
    type: String
  },

  startDate: {
    type: Date
  },

  endDate: {
    type: Date
  },

  weAreComingCount: {
    type: Number,
    default: 0
  },

  views: {
    type: Number,
    default: 0
  },

  winners: {
    first: {
      type: String,
      default: ""
    },
    second: {
      type: String,
      default: ""
    },
    third: {
      type: String,
      default: ""
    }
  }

}, { timestamps: true });

module.exports = mongoose.model("Event", EventSchema);