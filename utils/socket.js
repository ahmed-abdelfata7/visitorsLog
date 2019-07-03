"use strict";
let io;

module.exports = {
  initIo(httpServer) {
    io = require("socket.io")(httpServer);
    return io;
  },
  getIO() {
    if (!io) {
      console.log("Socket Connection Error!!!");
    } else {
      return io;
    }
  }
};
