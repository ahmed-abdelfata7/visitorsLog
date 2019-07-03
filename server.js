const app = require("./app");
const config = require("./config");
const DB = require("./utils/dbConnection");
DB.connect();
//starting server
const PORT = config.SERVER.PORT;
const HOST = config.SERVER.HOST;

app.http.listen(config.SERVER.PORT, () => {
  console.log(`Server Starting http://${HOST}:${PORT}`);
});
module.exports = app.app;
