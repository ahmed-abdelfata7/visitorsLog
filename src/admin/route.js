"use strict";
const express = require("express");
const router = express.Router();
const validator = require("./../../utils/validator");
const adminCtrl = require("./ctrl");
const authMiddleware = require("./../../utils/auth");
router.get("/", (req, res, next) => {
  if (req.session.role === "admin") {
    res.status(200).redirect("/admin/dashboard");
  } else {
    res.status(200).render("layouts/login", { msg: "" });
  }
});
router.post("/login", async (req, res, next) => {
  let { password, userName } = req.body;
  let login = await adminCtrl.login({ password, userName });
  if (login) {
    req.session.role = "admin";
    res.status(200).redirect("/admin/dashboard");
  } else {
    res.status(200).render("layouts/login", {
      msg: "Authentication Failed!"
    });
  }
});
router.get("/dashboard", authMiddleware, async (req, res, next) => {
  let logs = await adminCtrl.logs();
  res.status(200).render("layouts/dashboard", { logs: logs });
});
router.get("/logout", authMiddleware, (req, res, next) => {
  req.session.destroy();
  res.status(200).redirect("/admin");
});
router.get("/deleteLog/:id", authMiddleware, async (req, res, next) => {
  let visitId = req.params.id;
  await adminCtrl.deleteVisit(visitId);
  res.status(200).redirect("/admin");
});
router.post("/editVisit", authMiddleware, async (req, res, next) => {
  let { name, company, _id, phone, timeOut } = req.body;
  timeOut = Date.parse(timeOut);
  await adminCtrl.editVisit({ name, company, _id, phone, timeOut });
  res.status(200).redirect("/admin");
});
router.post("/search", authMiddleware, async (req, res, next) => {
  let { from, to } = req.body;
  let searchResults = await adminCtrl.searchLogs({ from, to });
  res.status(200).render("layouts/search", { result: searchResults });
});
module.exports = router;
