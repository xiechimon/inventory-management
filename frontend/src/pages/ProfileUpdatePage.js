import { motion } from "framer-motion";
import { User, Mail, Phone, FileText, Save, Camera } from "lucide-react";
import Header from "../components/common/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileUpdatePage = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [profile, setProfile] = useState({
        name: "管理员",
        email: "admin@example.com",
        phone: "138 **** 5678",
        bio: "这是一段个人简介，描述了用户的基本情况和专业背景。",
        photo: "https://randomuser.me/api/portraits/men/2.jpg",
    });
    // const [showPhotoOptions, setShowPhotoOptions] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("资料更新成功");
        navigate("/profile");
    };

    // const handlePhotoClick = () => {
    //     setShowPhotoOptions(true);
    // };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="更改资料" />
            <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <User className="text-blue-600 mr-4" size="24" />
                            <h2 className="text-xl font-semibold text-gray-900">
                                更改资料
                            </h2>
                        </div>
                    </div>

                    {/* 表单内容 */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 头像预览 */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                {profile.photo ? (
                                    <div
                                        className="relative cursor-pointer group"
                                        // onClick={handlePhotoClick}
                                    >
                                        <img
                                            src={profile.photo}
                                            alt="Profile"
                                            className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                                            <Camera className="text-white w-8 h-8" />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <User size={48} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 姓名 */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                姓名
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-600 transition-colors">
                                    <User className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70
                                    placeholder:text-gray-400 text-gray-700 outline-none duration-200"
                                    placeholder="请输入姓名"
                                    required
                                />
                            </div>
                        </div>

                        {/* 邮箱（只读） */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                邮箱（不可修改）
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-gray-200 bg-gray-100
                                    text-gray-500 outline-none cursor-not-allowed"
                                    disabled
                                />
                            </div>
                        </div>

                        {/* 手机号码 */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                手机号码
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-600 transition-colors">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70
                                    placeholder:text-gray-400 text-gray-700 outline-none duration-200"
                                    placeholder="请输入手机号码"
                                />
                            </div>
                        </div>

                        {/* 个人简介 */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                个人简介
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-3 text-gray-500 group-focus-within:text-blue-600 transition-colors">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <textarea
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70
                                    placeholder:text-gray-400 text-gray-700 outline-none duration-200 min-h-[120px] resize-none"
                                    placeholder="请输入个人简介"
                                ></textarea>
                            </div>
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
                                className={`px-8 py-2.5 bg-blue-600 hover:bg-blue-700
                                text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2`}
                            >
                                <Save className="w-4 h-4" />
                                <span>保存更改</span>
                            </button>
                        </div>
                    </form>
                </motion.div>
            </main>
        </div>
    );
};

export default ProfileUpdatePage;
