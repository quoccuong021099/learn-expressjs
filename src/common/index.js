const connectDb = require("./connect-db");
const useBodyParser = require("./use-body-parser");
const listen = require("./listen-port");
const useCookieParser = require("./use-cookie-parser");
const useDotenv = require("./use-dotenv");

module.exports = {
  connectDb,
  useBodyParser,
  listen,
  useCookieParser,
  useDotenv,
};
