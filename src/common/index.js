const connectDb = require("./connect-db");
const useBodyParser = require("./use-body-parser");
const listen = require("./listen-port");

module.exports = {
  connectDb,
  useBodyParser,
  listen,
};
