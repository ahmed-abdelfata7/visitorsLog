"use strict";
const mongoose = require("mongoose");
const schmea = mongoose.Schema;
const visitSchema = new schmea({
  visitorId: {
    type: String,
    required: true,
    trim: true
  },
  whoMeet: {
    type: String,
    required: true
  },
  timeIn: {
    type: Number,
    default: Date.now()
  },
  timeOut: {
    type: Number
  }
});
module.exports = mongoose.model("Visit", visitSchema, "visits");
