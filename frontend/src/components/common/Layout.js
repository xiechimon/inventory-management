import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-300 text-gray-900 overflow-hidden">
            {/* BG */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-400 to-gray-400 opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>
            {children} {/* 这里渲染页面内容 */}
        </div>

    );
};

export default Layout;
