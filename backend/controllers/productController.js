const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

const createProduct = asyncHandler(async (req, res) => {
    const { name, sku, category, quantity, price, description } = req.body;

    // 验证
    if (!name || !category || !quantity || !price || !description) {
        res.status(400);
        throw new Error("请填写所有信息");
    }

    // 处理图片上传
    let fileData = {};
    if (req.file) {
        // 将文件存到云端然后获取云上的URL上传
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Inventory App",
                resource_type: "image",
            });
        } catch (error) {
            res.status(500);
            throw new Error("图片上传失败");
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        };
    }

    // 创建物品
    const product = await Product.create({
        user: req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData,
    });

    res.status(201).json(product);
});

// 获取所有产品
const getProducts = asyncHandler(async (req, res) => {
    // 将当前用户创建的产品按创建时间降序排列
    const products = await Product.find({ user: req.user.id }).sort(
        "-createdAt"
    );
    res.status(200).json(products);
});

// 获取单个产品
const getProduct = asyncHandler(async (req, res) => {
    // 从数据库中获取物品ID
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("物品未找到");
    }

    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("用户未认证");
    }

    res.status(200).json(product);
});

// 删除产品
const deleteProduct = asyncHandler(async (req, res) => {
    // 从数据库中查找物品，如果有就将其删除
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        res.status(404);
        throw new Error("物品未找到");
    }

    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("用户未认证");
    }

    await product.deleteOne();
    res.status(200).json({message: "物品已删除"})
    
});

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
};
