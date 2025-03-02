const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("用户未授权，请重新登录");
    }

    // 验证token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // 从token获取用户ID
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("未找到用户");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("用户未授权，请重新登录");
  }
});

module.exports = protect;
