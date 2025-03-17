import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { MessageCircle, Mail, Send, Info } from "lucide-react";
import { useState } from "react";
import {ReportUs} from "../services/contactService";

const ReportUsPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        subject: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 将邮箱拼接到主题后面
        const submissionData = {
            ...formData,
            subject: `${formData.subject} (联系邮箱: ${formData.email})`,
        };

        // 查看拼接后的数据
        console.log("提交的数据:", submissionData);

        // 提交
        try {
            const data = await ReportUs(submissionData);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
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
                            <MessageCircle
                                className="text-blue-600 mr-4"
                                size="24"
                            />
                            <h2 className="text-xl font-semibold text-gray-900">
                                问题反馈
                            </h2>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 用户信息 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 姓名 */}
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                    反馈主题
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-600 transition-colors">
                                        <Info className="w-5 h-5" />
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
                                        placeholder="请输入您的电子邮箱，以便我们能回复您"
                                        required
                                    />
                                </div>
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
                                p-4 placeholder:text-gray-400 text-gray-700 outline-none duration-200 min-h-[400px]"
                                placeholder="请详细描述您的问题或建议..."
                                required
                            ></textarea>
                        </div>

                        {/* 提交按钮 */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className={`px-8 py-2.5 bg-blue-600 hover:bg-blue-700
                                text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2
                                `}
                            >
                                <Send className="w-4 h-4" />
                                <span>提交反馈</span>
                            </button>
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
};

export default ReportUsPage;
