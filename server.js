const app = require("./app");

if (process.env.NODE_ENV !== "test") {
  const config = require("./config");
  //starting server
  const PORT = config.SERVER.PORT;
  const HOST = config.SERVER.HOST;

  app.listen(config.SERVER.PORT, () => {
    console.log(`Server Starting http://${HOST}:${PORT}`);
  });
}
module.exports = app;
