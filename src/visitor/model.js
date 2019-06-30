"use strict";
const mongoose = require("mongoose");
const schmea = mongoose.Schema;
const visitSchema = new schmea({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: Number,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  timeIn: {
    type: Number,
    default: Date.now()
  },
  timeOut: {
    type: Number,
    default: Date.now()
  }
});
module.exports = mongoose.model("Visit", visitSchema, "visits");
