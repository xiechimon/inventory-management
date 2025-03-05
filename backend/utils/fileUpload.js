const multer = require("multer");

// 定义文件存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // 获取当前日期时间后转为 ISO 格式
    },
});

// 可保存的指定文档格式
function fileFilter(req, file, cb) {
    // 当文件为 png、JPG、jepg 时，允许上传文件，否则不允许
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jepg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, fileFilter });

module.exports = { upload };
