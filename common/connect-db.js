const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/learn-node", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB successfully");
    });
};

module.exports = connectDb;
