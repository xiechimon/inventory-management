import React from "react";

const Header = ({ title }) => {
    return (
        <header className="bg-gray-400 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-500">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* 固定高度 */}
                <h1 className="text-2xl font-semibold text-gray-900">
                    {title}
                </h1>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 h-10 flex items-center justify-center">
                    退出登录
                </button>
            </div>
        </header>
    );
};

export default Header;
