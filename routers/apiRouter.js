const express = require("express");

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json("Hello API !");
});

apiRouter.get("/cart", (req, res) => {
  res.json("Hello cart !");
});

apiRouter.get("/:id", (req, res) => {
  res.json("Hello page: " + req?.params?.id);
});

module.exports = apiRouter;
