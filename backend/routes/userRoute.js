const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");

// 当客户端向 /register 发送 POST 请求时，调用函数处理请求
router.post("/register", registerUser);

module.exports = router;
