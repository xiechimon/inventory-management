import React, { useState, useRef, useEffect } from "react";
import Header from "../components/common/Header";
import { motion } from "framer-motion";
import { MessageCircle, Send, Bot, User, Trash2 } from "lucide-react";
import { sendMessage } from "../services/aiService";
import { toast } from "react-toastify";

const RobotPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [currentTypingMessage, setCurrentTypingMessage] = useState("");
    const [fullResponse, setFullResponse] = useState("");
    const messagesEndRef = useRef(null);
    const typingSpeed = 30; // 打字速度，数值越小越快

    // 自动滚动到最新消息
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, currentTypingMessage]);

    // 模拟打字效果
    useEffect(() => {
        if (isTyping && fullResponse) {
            if (currentTypingMessage.length < fullResponse.length) {
                const timeout = setTimeout(() => {
                    setCurrentTypingMessage(fullResponse.substring(0, currentTypingMessage.length + 1));
                }, typingSpeed);
                return () => clearTimeout(timeout);
            } else {
                // 打字完成
                setIsTyping(false);
                // 将完整消息添加到消息列表
                setMessages(prev => {
                    // 移除最后一条消息（如果是AI的临时消息）
                    const newMessages = [...prev];
                    if (newMessages.length > 0 && newMessages[newMessages.length - 1].isTyping) {
                        newMessages.pop();
                    }
                    // 添加完整消息
                    newMessages.push({
                        id: Date.now() + 1,
                        text: fullResponse,
                        sender: "ai",
                        timestamp: new Date().toLocaleTimeString(),
                        isTyping: false
                    });
                    return newMessages;
                });
                setFullResponse("");
                setCurrentTypingMessage("");
            }
        }
    }, [isTyping, fullResponse, currentTypingMessage]);

    // 发送消息
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // 添加用户消息到聊天记录
        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: "user",
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsLoading(true);

        try {
            // 发送消息到自定义API
            const response = await sendMessage(inputMessage);

            if (response.error) {
                toast.error(`请求失败: ${response.error}`);
                return;
            }

            // 获取AI回复内容
            const aiResponseText = response.choices && response.choices[0]
                ? response.choices[0].message.content
                : "无法获取回复";
            
            // 设置完整回复并开始打字效果
            setFullResponse(aiResponseText);
            setCurrentTypingMessage("");
            setIsTyping(true);
            
            // 添加一个临时的"正在输入"消息
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "",
                sender: "ai",
                timestamp: new Date().toLocaleTimeString(),
                isTyping: true
            }]);
            
        } catch (error) {
            console.error("发送消息失败:", error);
            toast.error("发送消息失败，请稍后再试");
        } finally {
            setIsLoading(false);
        }
    };

    // 清空聊天记录
    const clearMessages = () => {
        setMessages([]);
        setIsTyping(false);
        setFullResponse("");
        setCurrentTypingMessage("");
        toast.info("聊天记录已清空");
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="AI对话" />
            <main className="max-w-5xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <MessageCircle
                                className="text-blue-600 mr-4"
                                size="24"
                            />
                            <h2 className="text-xl font-semibold text-gray-900">
                                AI对话助手
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={clearMessages}
                                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                title="清空聊天记录"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>

                    {/* 聊天区域 */}
                    <div className="bg-white bg-opacity-90 rounded-xl p-4 mb-4 h-[500px] overflow-y-auto shadow-inner">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <Bot size={48} className="mb-2" />
                                <p>开始与AI助手对话吧！</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${
                                            msg.sender === "user"
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                                msg.sender === "user"
                                                    ? "bg-blue-500 text-white rounded-tr-none"
                                                    : "bg-gray-200 text-gray-800 rounded-tl-none border border-gray-300 shadow-sm"
                                            }`}
                                        >
                                            <div className="flex items-center mb-1">
                                                {msg.sender === "ai" ? (
                                                    <Bot
                                                        size={16}
                                                        className="mr-1 text-blue-600"
                                                    />
                                                ) : (
                                                    <User
                                                        size={16}
                                                        className="mr-1"
                                                    />
                                                )}
                                                <span className="text-xs opacity-75">
                                                    {msg.timestamp}
                                                </span>
                                            </div>
                                            <p className="whitespace-pre-wrap">
                                                {msg.isTyping ? currentTypingMessage : msg.text}
                                                {msg.isTyping && (
                                                    <span className="inline-block w-1 h-4 ml-1 bg-blue-500 animate-pulse"></span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && !isTyping && (
                                    <div className="flex justify-start">
                                        <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-200 text-gray-800 rounded-tl-none border border-gray-300 shadow-sm">
                                            <div className="flex items-center mb-1">
                                                <Bot
                                                    size={16}
                                                    className="mr-1 text-blue-600"
                                                />
                                                <span className="text-xs opacity-75">
                                                    {new Date().toLocaleTimeString()}
                                                </span>
                                            </div>
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                                <div
                                                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                                                    style={{
                                                        animationDelay: "0.2s",
                                                    }}
                                                ></div>
                                                <div
                                                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                                                    style={{
                                                        animationDelay: "0.4s",
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* 输入区域 */}
                    <form onSubmit={handleSendMessage} className="relative">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="输入您的问题..."
                            className="w-full rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70
              pl-4 pr-12 py-3 placeholder:text-gray-400 text-gray-700 outline-none duration-200"
                            disabled={isLoading || isTyping}
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                            disabled={isLoading || isTyping || !inputMessage.trim()}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </motion.div>
            </main>
        </div>
    );
};

export default RobotPage;
