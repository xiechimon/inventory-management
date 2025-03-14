import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectName } from "../redux/features/auth/authSlice";
import { motion } from "framer-motion";
import { BadgeJapaneseYen, Ban, ShoppingBag, Tag } from "lucide-react";

import StatCard from "../components/common/StatCard";
import Header from "../components/common/Header";
import React, { useEffect } from "react";
import ProductsTable from "../components/products/ProductsTable";
import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
import { getProducts } from "../redux/features/product/productSlice";

const DashboardPage = () => {
    useRedirectLoggedOutUser("/auth");

    const name = useSelector(selectName);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { products, isError, message } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getProducts());
        }

        if (isError) {
            console.log(message);
        }
    }, [isLoggedIn, isError, message, dispatch]);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Welcome, " subtitle={name} />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard
                        name="总产品量"
                        icon={ShoppingBag}
                        value="9"
                        backgroundColor="#851EB8FF"
                    />
                    <StatCard
                        name="总销售额"
                        icon={BadgeJapaneseYen}
                        value="¥12,345"
                        backgroundColor="#32963D"
                    />
                    <StatCard
                        name="缺货"
                        icon={Ban}
                        value="2"
                        backgroundColor="#C51848"
                    />
                    <StatCard
                        name="所有类别"
                        icon={Tag}
                        value="2"
                        backgroundColor="#00476DFF"
                    />
                </motion.div>

                <ProductsTable products={products} />
            </main>
        </div>
    );
};

export default DashboardPage;
