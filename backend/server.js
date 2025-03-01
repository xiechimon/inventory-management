// 导入依赖
const dotenv = require("dotenv").config(); // 初始化 .env
const express = require("express");
const mongoose = require("mongoose"); // 连接 MongoDB
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

// 连接数据库 & 开始服务
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
