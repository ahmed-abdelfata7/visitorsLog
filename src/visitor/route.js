"use strict";
const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).render("layouts/index");
});
module.exports = router;
