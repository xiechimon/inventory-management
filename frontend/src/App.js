import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/common/Layout";

import Auth from "./pages/auth/Auth";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardPage from "./pages/DashboardPage";
import AddProductPage from "./pages/AddProductPage";
import ProfilePage from "./pages/ProfilePage"
import ProfileUpdatePage from "./pages/ProfileUpdatePage"
import ContactUsPage from "./pages/ContactUsPage"


function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 认证 */}
                <Route path="/" element={<Navigate to="/auth" replace />} />
                <Route path="/auth" element={<Auth />} />

                {/* 仪表盘 */}
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile-update" element={<ProfileUpdatePage />} />
                    <Route path="/contact-us" element={<ContactUsPage/>} />

                    <Route path="/overview" element={<OverviewPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
