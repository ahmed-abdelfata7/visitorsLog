"use strict";
const socket = require("./../utils/socket").getIO();
const visitCtrl = require("./visits/ctrl");
const visitorCtrl = require("./visitor/ctrl");
const validator = require("./../utils/validator");

socket.on("connection", sock => {
  sock.on("check_phone", async data => {
    //validate phoneNumber
    const phoneNumberCheck = validator.phoneNumber(data.phone);
    if (phoneNumberCheck === false) {
      sock.emit("phone_error", "Enter Correct Phone Number!");
    } else {
      if (data.type === "in") {
        //check if visitor exist in db or not
        let visitorCheck = await visitorCtrl.checkVisitor(data.phone);
        if (visitorCheck === false) {
          //load visitor page
          sock.emit("newVisit", data);
        } else {
          sock.emit("newVisit", visitorCheck);
        }
      } else {
        let checkOut = await visitCtrl.checkOutValidate(data.phone);
        if (checkOut) {
          //update visit timeout
          await visitCtrl.updateVisit(data.phone);
          sock.emit("saveVisit", "GoodBay ");
        } else {
          socket.emit(
            "newVisit_error",
            "Make sure that you check in first Ask for Admin Help!"
          );
        }
      }
    }
  });
  sock.on("save_visit", async data => {
    let { phone, name, company, whoMeet } = data;
    if (data.type === "in") {
      //checkIn check
      let checkIn = await visitCtrl.checkInValidate(phone);
      if (checkIn === false) {
        sock.emit(
          "newVisit_error",
          "Sorry You Can not check in Ask for Admin Help!"
        );
      } else {
        //save visit
        await visitorCtrl.save({ name, company, phone, whoMeet });
        sock.emit("saveVisit", "Welcome " + name);
      }
    }
  });
});
/*
    if (check === false) {
      //redirect to save new visitor page
    } else {
      //check if in or out to add data
      if (type === "in") {
        //check visitor has checkout before or not
        let checkIn = await visitCtrl.checkInValidate(phone);
        if (checkIn === false) {
          socket.emit(
            "error",
            "Sorry You Can not check in Ask for Admin Help!"
          );
          return res.status(200).render("layouts/in_out");
        } else {
          //get visitor data and save it in session
          res.status(200).render("layouts/index", {
            phone: check.phone,
            company: check.company,
            name: check.name
          });
        }
      } else {
        let checkOut = await visitCtrl.checkOutValidate(phone);
        if (checkOut) {
          //update visit timeout
          await visitCtrl.updateVisit(phone);
          return res.status(200).render("layouts/in_out");
        } else {
          res.status(200).render("layouts/in_out");
          socket.emit(
            "error",
            "Make sure that you check in first Ask for Admin Help!"
          );
        }
      }
    }

*/
