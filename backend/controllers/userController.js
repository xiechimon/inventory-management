// 处理请求的具体实现
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// 生成Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "365d" });
};

// 用户注册
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

  // 发送 HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400 * 365), // 365 day
    sameSite: "none",
    secure: true,
  });

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

// 用户登录 - 获取邮箱密码，然后去数据库中验证
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 验证请求
  if (!email || !password) {
    res.status(400);
    throw new Error("请添加邮箱和密码");
  }

  // 检查用户是否存在
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("未找到用户，请注册");
  }

  // 用户存在，检查密码是否正确
  const pwdIsCorrect = password === user.password;

  // 生成 jwt token
  const token = generateToken(user._id);

  // 发送 HTTP-only cookie
  if (pwdIsCorrect) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400 * 365), // 365 day
      sameSite: "none",
      secure: true,
    });
  }

  if (user && pwdIsCorrect) {
    const { _id, _name, email, photo, phone, bio } = user;
    res.status(200).json({
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
    throw new Error("邮箱或者密码无效");
  }
});

// 退出登录
const logoutUser = asyncHandler(async (req, res) => {
  // 让cookie直接过期即可
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 现在过期
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "退出登录成功" });
});

// 获取用户数据
const getUser = asyncHandler(async (req, res) => {
  res.send("获取用户资料");
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
};
