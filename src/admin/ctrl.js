"use strict";
const admin = require("./model");
const visitorModel = require("./../visitor/model");
const visitModel = require("./../visits/model");
const bcrypt = require("bcrypt");
/**
 * @class Admin
 * @author Eng AhmedMahmoud
 * @description admin management interface
 */
class Admin {
  async checkAdminExistance() {
    let check = await admin.find();
    return check.length !== 0 ? true : false;
  }
  async createAdminAccount() {
    let check = await this.checkAdminExistance();
    if (check === false) {
      let adminAccount = {
        userName: "admin",
        password: this.passwordEncryption("admin")
      };
      let save = new admin(adminAccount);
      await save.save();
    }
  }
  passwordEncryption(password) {
    if (password) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const encryptedPassword = bcrypt.hashSync(password, salt);
      return encryptedPassword;
    } else {
      return null;
    }
  }
  async login(account) {
    let accountDetails = await admin.find({ userName: account.userName });
    if (accountDetails[0]) {
      return bcrypt.compareSync(account.password, accountDetails[0].password);
    } else {
      return false;
    }
  }
  async logs() {
    let logData = [];
    let visitorLogs = await visitorModel.find();
    let visitLogs = await visitModel.find();
    visitLogs.forEach(visit => {
      let allData = {};
      visitorLogs.forEach(visitor => {
        if (visitor.phone === visit.phone) {
          allData.name = visitor.name;
          allData.company = visitor.company;
          allData.whoMeet = visit.whoMeet;
          allData.phone = visitor.phone;
          allData.timeIn = visit.timeIn;
          allData._id = visit._id;
          allData.timeOut = visit.timeOut ? visit.timeOut : null;
          logData.push(allData);
        }
      });
    });
    return logData;
  }
  async deleteVisit(id) {
    await visitModel.findByIdAndDelete(id);
  }
  async editVisit(visit) {
    let { name, company, _id, phone, timeOut } = visit;
    await visitModel.findByIdAndUpdate(_id, { name, company, phone, timeOut });
  }
  async searchLogs(range) {
    let logData = [];
    let visitorLogs = await visitorModel.find();
    let from = Date.parse(range.from);
    let to = Date.parse(range.to);
    let visitLogs = await visitModel.find({
      $and: [{ timeIn: { $gt: from } }, { timeIn: { $lt: to } }]
    });
    visitLogs.forEach(visit => {
      let allData = {};
      visitorLogs.forEach(visitor => {
        if (visitor.phone === visit.phone) {
          allData.name = visitor.name;
          allData.company = visitor.company;
          allData.whoMeet = visit.whoMeet;
          allData.phone = visitor.phone;
          allData.timeIn = visit.timeIn;
          allData._id = visit._id;
          allData.timeOut = visit.timeOut ? visit.timeOut : null;
          logData.push(allData);
        }
      });
    });
    return logData;
  }
}
const adminObj = new Admin();
module.exports = adminObj;
