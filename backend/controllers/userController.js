// 处理请求的具体实现
const registerUser = (req, res) => {
  if (!req.body.email) {
    res.status(400);
    throw new Error("E");
  }
  res.send("用户注册");
};

module.exports = {
  registerUser,
};
