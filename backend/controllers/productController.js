const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;

  // 验证
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("请填写所有信息");
  }

  // 管理图片上传

  // 创建物品
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    // image
  });

  res.status(201).json(product);
});

module.exports = {
  createProduct,
};
