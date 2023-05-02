const express = require("express");
const { AccountModel } = require("../models");

const router = express.Router();

// login
router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await AccountModel.findOne({ username, password });

    if (!user) {
      return res.status(400).json({ code: 400, message: "User isn't exists" });
    }

    return res.status(200).json({
      code: 200,
      message: "login successfully",
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: "login failed" });
  }
});

// register

router.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await AccountModel.findOne({ username });

    if (user) {
      return res
        .status(400)
        .json({ code: 400, message: "User already exists" });
    }

    const account = await AccountModel.create({
      username,
      password,
    });
    return res.status(200).json({
      code: 200,
      message: "create user successfully",
      data: account,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "create user is failed" });
  }
});

module.exports = router;
