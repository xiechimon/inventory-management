import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectName } from "../redux/features/auth/authSlice";
import Header from "../components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    getOneProduct,
    getProducts,
} from "../redux/features/product/productSlice";

const ProductDetailPage = () => {
    const name = useSelector(selectName);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams(); // 获取路由页的id

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { product, isError, message } = useSelector((state) => state.product);


    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getOneProduct(id));
        }

        if (isError) {
            console.log(message);
        }
    }, [isLoggedIn, isError, message, dispatch]);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Welcome, " subtitle={name} />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    返回
                </button>

                <motion.div
                    className="bg-gray-200 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            产品详情页 - 产品 ID: {id}
                        </h2>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default ProductDetailPage;
