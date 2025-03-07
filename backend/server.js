// 导入依赖
const dotenv = require("dotenv").config(); // 初始化 .env
const express = require("express");
const mongoose = require("mongoose"); // 连接 MongoDB
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");

const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

// 中间件 - 解析请求体中的数据
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 路由中间件
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

// 路由
app.get("/", (req, res) => {
    res.send("Home page11");
});

// Error 中间件
app.use(errorHandler);

// 连接数据库 & 开始服务
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on port http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.log(err));
