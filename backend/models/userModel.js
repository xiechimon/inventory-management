const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "输入用户名"],
    },
    email: {
      type: String,
      required: [true, "输入邮箱"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "请输入有效的邮箱",
      ],
    },
    password: {
      type: String,
      required: [true, "输入密码"],
      minLength: [6, "密码长度必须超过6个字符"],
      maxLength: [20, "密码长度必须少于20个字符"],
    },
    photo: {
      type: String,
      required: [true, "添加照片"],
      default: "https://i.postimg.cc/pLJxRSJq/image.png",
    },
    phone: {
      type: String,
      default: "+86",
    },
    bio: {
      type: String,
      maxLength: [250, "简介不能多于250字符"],
      default: "简介",
    },
  },
  {
    timestamps: true, // 启用时间戳功能，自动为文档添加创建和更新时间
  }
);

const User = mongoose.model("User", userSchema); // 创建模型
module.exports = User; // 导出模型
