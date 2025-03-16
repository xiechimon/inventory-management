import React, { useState } from "react";
import Header from "../components/common/Header";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePasswordPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 简单的表单验证
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("新密码与确认密码不匹配");
            return;
        }

        if (formData.newPassword.length < 6) {
            toast.error("新密码长度不能少于6个字符");
            return;
        }

        setIsLoading(true);

        // 模拟提交过程
        setTimeout(() => {
            setIsLoading(false);
            toast.success("密码修改成功");
            navigate("/profile");
        }, 1500);
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="更改密码" />
            <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <Lock className="text-red-600 mr-4" size="24" />
                            <h2 className="text-xl font-semibold text-gray-900">
                                更改密码
                            </h2>
                        </div>
                    </div>

                    {/* 安全提示 */}
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-red-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    为了保障您的账户安全，请使用包含字母、数字和特殊字符的强密码，且不要与其他网站使用相同的密码。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 密码修改表单 */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 当前密码 */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                当前密码
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showOldPassword ? "text" : "password"}
                                    name="oldPassword"
                                    value={formData.oldPassword}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-12 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-red-500 bg-white/70
                                    placeholder:text-gray-400 text-gray-700 outline-none duration-200"
                                    placeholder="请输入当前密码"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={() =>
                                        setShowOldPassword(!showOldPassword)
                                    }
                                >
                                    {showOldPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* 新密码 */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                新密码
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-12 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-red-500 bg-white/70
                                    placeholder:text-gray-400 text-gray-700 outline-none duration-200"
                                    placeholder="请输入新密码"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={() =>
                                        setShowNewPassword(!showNewPassword)
                                    }
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 ml-1">
                                密码长度至少为6个字符
                            </p>
                        </div>

                        {/* 确认新密码 */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                确认新密码
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-12 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-red-500 bg-white/70
                                    placeholder:text-gray-400 text-gray-700 outline-none duration-200"
                                    placeholder="请再次输入新密码"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* 密码强度提示 */}
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-700 mb-2">
                                强密码建议：
                            </h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                                <li>至少包含一个大写字母</li>
                                <li>至少包含一个小写字母</li>
                                <li>至少包含一个数字</li>
                                <li>至少包含一个特殊字符（如 !@#$%^&*）</li>
                                <li>长度至少为8个字符</li>
                            </ul>
                        </div>

                        {/* 提交按钮 */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300
                                text-gray-700 font-medium rounded-xl transition-colors"
                            >
                                取消
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-8 py-2.5 bg-red-600 hover:bg-red-700
                                text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2
                                ${
                                    isLoading
                                        ? "opacity-70 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                {isLoading ? (
                                    "保存中..."
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        <span>更改密码</span>
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

export default ProfilePasswordPage;
