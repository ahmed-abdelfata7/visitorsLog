"use strict";
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const adminSchema = new schema({
  userName: {
    trim: true,
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    default: Date.now()
  },
  updatedAt: {
    type: Number,
    default: Date.now()
  }
});
module.exports = mongoose.model("Admin", adminSchema, "admin");
