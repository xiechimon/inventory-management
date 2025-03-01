// 导入依赖
const dotenv = require("dotenv").config(); // 初始化 .env
const express = require("express");
const mongoose = require("mongoose"); // 连接 MongoDB
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");

const app = express();

const PORT = process.env.PORT || 5000;

// 中间件 - 解析请求体中的数据
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 挂载路由
app.use("/api/users", userRoute);

// 路由
app.get("/", (req, res) => {
  res.send("Home page11");
});

// 连接数据库 & 开始服务
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
