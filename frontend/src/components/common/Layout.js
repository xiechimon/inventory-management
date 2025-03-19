import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import {  getUser } from "../../services/authService";
import { useDispatch } from "react-redux";
import { SET_USER } from "../../redux/features/auth/authSlice";

const Layout = () => {
    const dispatch = useDispatch();
    // 防止刷新页面，头像信息丢失
    useEffect(() => {
        async function getUserData() {
            const data = await getUser();
            await dispatch(SET_USER(data));
        }
        getUserData();
    }, [dispatch]);

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
