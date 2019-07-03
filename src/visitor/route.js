"use strict";
const express = require("express");
const router = express.Router();
const validator = require("./../../utils/validator");
const visitCtrl = require("./ctrl");
router.get("/", (req, res, next) => {
  res.status(200).render("layouts/in_out");
});
router.post("/in_out", async (req, res, next) => {
  let type = req.body.type;
  let phone = req.body.phone;
  let check = await visitCtrl.checkVisitor(phone);
  if (check === false) {
    //redirect to save new visitor page
  } else {
    //check if in or out to add data
  }
  res.send(check);
});
router.post("/login", async (req, res, next) => {
  let { name, company, phone, timeIn } = req.body;
  /*here will be the validation
  let empty = validator.empty({ name, company, phone, timeIn });
  res.json({
    errors: empty
  });
  */
  await visitCtrl.save({ name, company, phone, timeIn });
  req.session.msg = `Thanks ${name} your data saved successfully`;
  res.status(200).redirect("/");
});
module.exports = router;
