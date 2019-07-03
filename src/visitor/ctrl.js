"use strict";
const visitorModel = require("./model");
const visitModel = require("./../visits/model");

class Visitor {
  async save(visitor) {
    let checkVisitor = await this.checkVisitor(visitor.phone);
    if (checkVisitor === false) {
      let newVisitor = new visitorModel(visitor);
      await newVisitor.save();
    }
    //saving visit in db
    let newVisit = new visitModel({
      phone: visitor.phone,
      whoMeet: visitor.whoMeet
    });
    await newVisit.save();
  }
  async checkVisitor(phoneNumber) {
    let visitor = await visitorModel.find({ phone: phoneNumber });
    return visitor.length !== 0 ? visitor[0] : false;
  }
  async takeDecision(inputData) {}
}

module.exports = new Visitor();
