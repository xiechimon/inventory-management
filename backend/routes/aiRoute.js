const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/chat", async (req, res) => {
    try {
        const { message, apiKey } = req.body;

        if (!apiKey) {
            return res.status(400).json({ error: "API密钥未提供" });
        }

        const response = await axios.post(
            process.env.AI_API_ADDRESS,
            {
                model: process.env.AI_API_MODEL,
                stream: false,
                max_tokens: 512,
                temperature: 0.7,
                top_p: 0.7,
                top_k: 50,
                frequency_penalty: 0.5,
                n: 1,
                messages: [
                    {
                        role: "user",
                        content: message,
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("AI API错误:", error.response?.data || error.message);

        res.status(error.response?.status || 500).json({
            error:
                error.response?.data?.error ||
                error.message ||
                "请求AI服务失败",
        });
    }
});

module.exports = router;
