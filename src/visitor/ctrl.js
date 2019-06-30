"use strict";
const visitorModel = require("./model");

class Visitor {
  async save(visitor) {
    let newVisit = new visitorModel(visitor);
    await newVisit.save();
  }
}
module.exports = new Visitor();
