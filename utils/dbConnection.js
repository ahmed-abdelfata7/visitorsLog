"use strict";
const mongoose = require("mongoose");
const config = require("./../config");
const dbURL = config.DB.URL;
const connect = () => {
  mongoose
    .connect(dbURL, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
      console.log("DataBase connected Successfully");
      return 200;
    })
    .catch(err => {
      console.log(`DataBase Error!! ${err}`);
      return 500;
    });
};
module.exports = { connect };
