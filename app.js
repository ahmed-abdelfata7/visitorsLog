"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const visitorRoutes = require("./src/visitor/route");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setting views and template engine
app.set("views", path.join(__dirname, "views"));
app.use(express.static("assets"));
app.set("view engine", "ejs");

app.use("/", visitorRoutes);
app.use((req, res, next) => {
  res.status(404).json({
    msg: "NotFound"
  });
});
app.use((err, req, res, next) => {
  res.status(500).json(err);
});
module.exports = app;
