const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../constants");
const { AccountModel } = require("../models");

const checkRoleMiddleware = {
  checkStudent: async (req, res, next) => {
    const role = req.data.role;
    if (role === "student" || role === "teacher" || role === "admin")
      return next();
    return res.status(401).json({
      code: 401,
      message: "You don't have permission",
    });
  },
  checkTeacher: async (req, res, next) => {
    const role = req.data.role;
    if (role === "teacher" || role === "admin") {
      return next();
    }
    return res.status(401).json({
      code: 401,
      message: "You don't have permission",
    });
  },
  checkAdmin: async (req, res, next) => {
    const role = req.data.role;
    if (role === "admin") {
      return next();
    }
    return res.status(401).json({
      code: 401,
      message: "You don't have permission",
    });
  },
};

module.exports = checkRoleMiddleware;
