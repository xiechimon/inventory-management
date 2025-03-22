import axios from "axios";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

import Layout from "./components/common/Layout";

import Auth from "./pages/auth/Auth";
import DashboardPage from "./pages/DashboardPage";
import AddProductPage from "./pages/AddProductPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileUpdatePage from "./pages/ProfileUpdatePage";
import ReportUsPage from "./pages/ReportUsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import EditProductPage from "./pages/EditProductPage";
import ProfilePasswordPage from "./pages/ProfilePasswordPage";
import RobotPage from "./pages/RobotPage";
import userManagementPage from "./pages/userManagementPage";

axios.defaults.withCredentials = true;

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        async function loginStatus() {
            const status = await getLoginStatus();
            dispatch(SET_LOGIN(status));
        }
        loginStatus();
    }, [dispatch]);

    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                {/* 认证 */}
                <Route path="/" element={<Navigate to="/auth" replace />} />
                <Route path="/auth" element={<Auth />} />

                {/* 仪表盘 */}
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route
                        path="/dashboard/product/:id"
                        element={<ProductDetailPage />}
                    />
                    <Route
                        path="/dashboard/edit/:id"
                        element={<EditProductPage />}
                    />
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route path="/user-management" element={<userManagementPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route
                        path="/profile-update"
                        element={<ProfileUpdatePage />}
                    />
                    <Route
                        path="/profile-password"
                        element={<ProfilePasswordPage />}
                    />
                    <Route path="/report-us" element={<ReportUsPage />} />
                    <Route path="/robot" element={<RobotPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
