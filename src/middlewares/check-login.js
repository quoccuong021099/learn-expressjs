const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../constants");
const { AccountModel } = require("../models");

const checkLoginMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const dataUser = await jwt.verify(token, JWT_KEY);
    const data = await AccountModel.findOne({
      _id: dataUser._id,
    });
    if (data) {
      req.data = data;
      next();
    } else {
      return res.status(401).json({
        code: 401,
        message: "You need to login",
      });
    }
  } catch (error) {
    //   res.redirect("/login")
    return res.status(401).json({
      code: 401,
      message: "You need to login",
    });
  }
};

module.exports = checkLoginMiddleware;
