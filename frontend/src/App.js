import axios from "axios";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

import Layout from "./components/common/Layout";

import Auth from "./pages/auth/Auth";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardPage from "./pages/DashboardPage";
import AddProductPage from "./pages/AddProductPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileUpdatePage from "./pages/ProfileUpdatePage";
import ContactUsPage from "./pages/ContactUsPage";
import ContactPage from "./pages/ContactPage";

axios.defaults.withCredentials = true;

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        async function loginStatus() {
            const status = await getLoginStatus();
            dispatch(SET_LOGIN(status));
        }
        loginStatus()
        
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
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route
                        path="/profile-update"
                        element={<ProfileUpdatePage />}
                    />
                    <Route path="/contact-us" element={<ContactUsPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    <Route path="/overview" element={<OverviewPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
