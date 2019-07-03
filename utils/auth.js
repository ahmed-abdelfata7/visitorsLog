"use strict";
module.exports = (req, res, next) => {
  if (req.session.role === "admin") {
    next();
  } else {
    res.status(401).render("layouts/unauthorized");
  }
};
