require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  PAGE_SIZE: 10,
  JWT_KEY: process.env.JWT_KEY,
};
