"use strict";
const admin = require("./../src/admin/ctrl");
const init = async () => {
  await admin.createAdminAccount();
};
module.exports = init;
