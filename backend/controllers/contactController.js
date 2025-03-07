const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

const contactUs = asyncHandler(async (req, res) => {
    const { subject, message } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("用户未找到，请注册");
    }

    // 验证
    if (!subject || !message) {
        res.status(404);
        throw new Error("请添加标题和信息");
    }

    const send_to = process.env.EMAIL_USER;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = user.email;

    try {
        await sendEmail(subject, message, send_to, sent_from, reply_to);
        res.status(200).json({ success: true, message: "邮件已发送" });
    } catch (error) {
        res.status(500);
        console.error('邮件发送失败:', error);
        throw new Error("邮件未发送，请再次尝试");
    }
});

module.exports = {
    contactUs,
};
 