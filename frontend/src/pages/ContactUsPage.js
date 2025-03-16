import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { MessageCircle, User, Mail, Send, Info, HelpCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // 模拟提交过程
        setTimeout(() => {
            setIsLoading(false);
            toast.success("反馈已成功提交，我们会尽快回复您！");
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
        }, 1500);
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="问题反馈" />
            <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <MessageCircle className="text-blue-600 mr-4" size="24" />
                            <h2 className="text-xl font-semibold text-gray-900">
                                问题反馈
                            </h2>
                        </div>
                    </div>
                    
                    {/* 反馈说明 */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                        <div className="flex">
                            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mr-3" />
                            <div>
                                <p className="text-sm text-blue-700">
                                    欢迎提交您的问题、建议或反馈。我们的团队会认真阅读每一条反馈，并尽快回复您。
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* 反馈表单 */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 用户信息部分 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 姓名 */}
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                    您的姓名
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-600 transition-colors">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70
                                        placeholder:text-gray-400 text-gray-700 outline-none duration-200"
                                        placeholder="请输入您的姓名"
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* 邮箱 */}
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                    电子邮箱
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-600 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70
                                        placeholder:text-gray-400 text-gray-700 outline-none duration-200"
                                        placeholder="请输入您的电子邮箱"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* 主题 */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                反馈主题
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-600 transition-colors">
                                    <HelpCircle className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70
                                    placeholder:text-gray-400 text-gray-700 outline-none duration-200"
                                    placeholder="请简要描述您的问题或建议"
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* 详细内容 */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                详细内容
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70
                                p-4 placeholder:text-gray-400 text-gray-700 outline-none duration-200 min-h-[250px]"
                                placeholder="请详细描述您的问题或建议..."
                                required
                            ></textarea>
                        </div>
                        
                        {/* 提交按钮 */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-8 py-2.5 bg-blue-600 hover:bg-blue-700
                                text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2
                                ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {isLoading ? "提交中..." : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>提交反馈</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
};

export default ContactUsPage;
