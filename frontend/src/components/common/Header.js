import React, { useState, useRef, useEffect } from "react";
import { getLoginStatus, logoutUser } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

const Header = ({ title, subtitle }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const avatarRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState({
        top: 0,
        right: 0,
    });

    const logout = async () => {
        try {
            await logoutUser();
            dispatch(SET_LOGIN(false));
            navigate("/auth");
        } catch (error) {
            console.error("登出失败:", error);
        }
    };

    const CheckToProfile = () => {
        navigate("/profile");
        setIsDropdownOpen(false); // 关闭下拉菜单
    };

    // 计算下拉菜单位置
    useEffect(() => {
        if (isDropdownOpen && avatarRef.current) {
            const rect = avatarRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                right: window.innerWidth - rect.right,
            });
        }
    }, [isDropdownOpen]);

    // 点击外部关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                avatarRef.current &&
                !avatarRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-gray-400 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-500">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* 固定高度 */}
                <h1 className="text-2xl font-semibold text-gray-900">
                    {title}
                    <span
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={CheckToProfile}
                    >
                        {subtitle}
                    </span>
                </h1>
                {/* 头像 */}
                <div ref={avatarRef}>
                    <div
                        className="w-10 h-10 rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:brightness-110 hover:shadow-md"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <img
                            src={
                                user.photo ||
                                "https://i.postimg.cc/pLJxRSJq/image.png"
                            }
                            alt="用户头像"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* 使用Portal渲染下拉菜单到body */}
            {isDropdownOpen &&
                createPortal(
                    <div
                        ref={dropdownRef}
                        className="fixed bg-white rounded-lg shadow-xl py-2 border border-gray-200 overflow-hidden w-43 animate-dropdown"
                        style={{
                            top: `${dropdownPosition.top}px`,
                            right: `${dropdownPosition.right}px`,
                            zIndex: 99999,
                            transformOrigin: "top right",
                            animation: "dropdown 0.2s ease-out forwards",
                        }}
                    >
                        <button
                            onClick={CheckToProfile}
                            className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            个人中心
                        </button>
                        <button
                            onClick={logout}
                            className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            退出登录
                        </button>
                    </div>,
                    document.body
                )}
        </header>
    );
};

export default Header;
