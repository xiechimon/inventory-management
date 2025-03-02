// 处理请求的具体实现
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "365d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 验证
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("请添加所有必填字段");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("密码必须大于6位");
  }

  // 检查邮箱是否存在
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("该邮箱已被注册");
  }

  // 创建新用户
  const user = await User.create({
    name,
    email,
    password,
  });

  // 生成 jwt token
  const token = generateToken(user._id);

  if (user) {
    const { _id, _name, email, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      _name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("无效的用户数据");
  }
});

module.exports = {
  registerUser,
};
