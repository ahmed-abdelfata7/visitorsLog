"use strict";
const mongoose = require("mongoose");
const schmea = mongoose.Schema;
const visitorSchema = new schmea({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  }
});
module.exports = mongoose.model("Visitor", visitorSchema, "visitors");
