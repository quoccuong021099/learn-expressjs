const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    username: String,
    password: String,
    role: String,
  },
  {
    collection: "accounts",
  }
);

const AccountModel = mongoose.model("Account", AccountSchema);

module.exports = AccountModel;
