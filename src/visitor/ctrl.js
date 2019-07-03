"use strict";
const visitorModel = require("./model");

class Visitor {
  async save(visitor) {
    let newVisit = new visitorModel(visitor);
    await newVisit.save();
  }
  async checkVisitor(phoneNumber) {
    let visitor = await visitorModel.find({ phone: phoneNumber });
    return visitor.length !== 0 ? visitor[0]._id : false;
  }
}
module.exports = new Visitor();
