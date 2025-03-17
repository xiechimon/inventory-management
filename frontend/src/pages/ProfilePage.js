import Header from "../components/common/Header";
import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
import { Edit, Lock, User2 } from "lucide-react";
import SettingSection from "../components/profile/ProfileSection";
import { useDispatch } from "react-redux";
import { getUser } from "../services/authService";
import { useEffect, useState } from "react";
import { SET_NAME, SET_USER } from "../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const ProfilePage = () => {
    useRedirectLoggedOutUser("/auth");
    const dispatch = useDispatch();

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function getUserData() {
            const data = await getUser();
            // console.log(data);

            setProfile(data);
            await dispatch(SET_USER(data));
            await dispatch(SET_NAME(data.name));
        }
        getUserData();
    }, [dispatch]);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="资料" />
            <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
                <SettingSection icon={User2} title={"个人资料"}>
                    <div className="flex flex-col md:flex-row gap-8 mb-6">
                        {/* 左侧头像区域 */}
                        <div className="flex flex-col items-center justify-center md:w-1/3">
                            <div className="relative group">
                                {profile && profile.photo ? (
                                    <img
                                        src={profile.photo}
                                        alt="profilePic"
                                        className="rounded-full w-48 h-48 object-cover shadow-lg border-4 border-white"
                                    />
                                ) : (
                                    <div className="rounded-full w-48 h-48 bg-gray-300 flex items-center justify-center">
                                        <User2
                                            size={64}
                                            className="text-gray-500"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 右侧个人信息区域 */}
                        <div className="md:w-2/3 space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        姓名
                                    </label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {profile ? profile.name : "加载中..."}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        邮箱
                                    </label>
                                    <p className="text-gray-700">
                                        {profile ? profile.email : "加载中..."}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        手机号码
                                    </label>
                                    <p className="text-gray-700">
                                        {profile ? profile.phone : "加载中..."}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        个人简介
                                    </label>
                                    <p className="text-gray-700">
                                        {profile ? profile.bio : "加载中..."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SettingSection>

                <SettingSection icon={Edit} title={"编辑"}>
                    <div className="space-y-6">
                        {/* 编辑选项卡片 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 更改资料卡片 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <User2 className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        个人资料设置
                                    </h3>
                                </div>
                                <p className="text-gray-600 mb-6">
                                    更新您的个人信息，包括姓名、邮箱、联系方式和个人简介等。
                                </p>
                                <Link to="/profile-update">
                                    <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition duration-200">
                                        <Edit className="w-4 h-4" />
                                        <span>更改资料</span>
                                    </button>
                                </Link>
                            </div>

                            {/* 更改密码卡片 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <div className="bg-red-100 p-3 rounded-full mr-4">
                                        <Lock className="h-6 w-6 text-red-600" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        安全设置
                                    </h3>
                                </div>
                                <p className="text-gray-600 mb-6">
                                    修改您的账户密码，建议定期更换密码以保障账户安全。
                                </p>
                                <Link to="/profile-password">
                                    <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-5 rounded-lg transition duration-200">
                                        <Lock className="w-4 h-4" />
                                        <span>更改密码</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </SettingSection>
            </main>
        </div>
    );
};

export default ProfilePage;
