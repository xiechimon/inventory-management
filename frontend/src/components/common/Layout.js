import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100 text-gray-900 overflow-hidden">
            {/* BG */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>
            <Sidebar />
            <Outlet />
        </div>

    );
};

export default Layout;
