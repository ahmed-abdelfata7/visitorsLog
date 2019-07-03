"use strict";
const visitModel = require("./model");
class Visit {
  async checkInValidate(phone) {
    let visits = await visitModel.find({ phone });
    const results = visits.filter(visit => {
      return visit.timeOut === null || visit.timeOut === undefined;
    });
    return results.length === 0 ? true : false;
  }
  async checkOutValidate(phone) {
    let visits = await visitModel.find({ phone });
    const results = visits.filter(visit => {
      return visit.timeOut === null || visit.timeOut === undefined;
    });
    return results.length === 1 ? true : false;
  }
  async updateVisit(phone) {
    let visits = await visitModel.find({ phone });
    const results = visits.filter(visit => {
      return visit.timeOut === null || visit.timeOut === undefined;
    });
    if (results.length === 1) {
      let visitId = results[0]._id;
      await visitModel.findByIdAndUpdate(visitId, { timeOut: Date.now() });
    }
  }
}
module.exports = new Visit();
