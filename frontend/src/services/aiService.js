import { toast } from "react-toastify";

// 自定义的AI API调用
export const sendMessage = async (message) => {
    try {
        // 这里替换为您自己的API端点
        const customApiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/ai/chat`;
        
        // 获取API密钥
        const apiKey = process.env.REACT_APP_CUSTOM_AI_API;
        
        if (!apiKey) {
            toast.error("API密钥未配置");
            return { error: "API密钥未配置" };
        }

        // 构建请求选项 - 简化请求，只发送必要信息
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                apiKey: apiKey  // 将API密钥作为请求体的一部分发送
            })
        };

        // 发送请求
        const response = await fetch(customApiUrl, options);
        
        // 检查响应状态
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("API响应错误:", response.status, errorData);
            throw new Error(errorData.error || `请求失败: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API调用错误:", error);
        const message = error.message || "未知错误";
        toast.error(message);
        return { error: message };
    }
};