const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "请添加物品名"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "物品",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "请添加分类"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "请添加数量"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "请添加数量"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "请添加物品描述"],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
