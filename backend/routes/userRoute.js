const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// 当客户端向 /register 发送 POST 请求时，调用函数处理请求
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
