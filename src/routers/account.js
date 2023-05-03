const express = require("express");
const jwt = require("jsonwebtoken");
const { AccountModel } = require("../models");
const { PAGE_SIZE, JWT_KEY } = require("../constants");
const { checkLoginMiddleware } = require("../middlewares");
const checkRoleMiddleware = require("../middlewares/check-role");

const router = express.Router();

// get list account student
router.get(
  "/student",
  checkLoginMiddleware,
  checkRoleMiddleware.checkStudent,
  async (req, res) => {
    try {
      return res.json({
        code: 200,
        message: "get list account student successfully",
      });
    } catch (error) {
      return res.status(500).json({ code: 500, message: error.message });
    }
  }
);

// get list account teacher
router.get(
  "/teacher",
  checkLoginMiddleware,
  checkRoleMiddleware.checkTeacher,
  async (req, res) => {
    try {
      return res.json({
        code: 200,
        message: "get list account teacher successfully",
      });
    } catch (error) {
      return res.status(500).json({ code: 500, message: error.message });
    }
  }
);

// get list account admin
router.get(
  "/admin",
  checkLoginMiddleware,
  checkRoleMiddleware.checkAdmin,
  async (req, res) => {
    try {
      return res.json({
        code: 200,
        message: "get list account admin successfully",
      });
    } catch (error) {
      return res.status(500).json({ code: 500, message: error.message });
    }
  }
);

// get all account
router.get(
  "/",
  checkLoginMiddleware,
  checkRoleMiddleware.checkAdmin,
  async (req, res) => {
    try {
      const page = req.query.page || 1;
      const offset = req.query.offset || PAGE_SIZE;
      if (!page) {
        const accounts = await AccountModel.find();
        return res.status(200).json({
          code: 200,
          message: "get all list user successfully",
          users: accounts,
        });
      }

      const skip = (parseInt(page) - 1) * parseInt(offset);
      const accounts = await AccountModel.find()
        .skip(skip)
        .limit(parseInt(offset));

      if (accounts.length > 0) {
        return res.status(200).json({
          code: 200,
          message: "get list user successfully",
          users: accounts,
        });
      }

      return res.status(200).json({
        code: 2004,
        message: "no content",
      });
    } catch (error) {
      return res.status(500).json({ code: 500, message: error.message });
    }
  }
);

// login
router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const redirect = req.body.redirect;

    const user = await AccountModel.findOne({ username, password });

    if (!user) {
      return res.status(400).json({ code: 400, message: "User isn't exists" });
    }

    const token = jwt.sign({ _id: user._id }, JWT_KEY);

    return res.status(200).json({
      code: 200,
      token,
      redirect,
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
      role: "student",
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
