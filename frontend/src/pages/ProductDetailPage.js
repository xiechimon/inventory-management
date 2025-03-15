import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectName } from "../redux/features/auth/authSlice";
import Header from "../components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getOneProduct } from "../redux/features/product/productSlice";
import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
import {
    AlertTriangle,
    ArrowLeftCircle,
    CheckCircle,
    ImageIcon,
    Info,
    Package,
    XCircle,
} from "lucide-react";

const ProductDetailPage = () => {
    useRedirectLoggedOutUser("/auth");

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
    }, [id, isLoggedIn, isError, message, dispatch]);

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Welcome, " subtitle={name} />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="bg-gray-200 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            产品详情
                        </h2>
                        {/* 返回按钮 */}
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1.5 text-gray-600 hover:text-blue-600
                            transition-colors group"
                        >
                            <ArrowLeftCircle className="w-8 h-8 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                    <div className="max-w-6xl mx-auto p-6">
                        {/* 标题 */}
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            {product?.name}
                        </h1>

                        <div className="text-gray-500 text-sm border-b pb-6">
                            SKU 编号：# {`${product?.sku}`}
                        </div>

                        {/* 主体内容网格布局 */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* 左侧图片区域 */}
                            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                                    {product?.image ? (
                                        <img
                                            src={product?.image.filePath}
                                            alt={product?.image.fileName}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                                            <p>暂无产品图片</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 右侧信息区域 */}
                            <div className="space-y-6">
                                {/* 状态卡片 */}
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                库存状态
                                            </dt>
                                            <dd className="mt-1">
                                                {product?.quantity > 0 ? (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                        库存充足
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800">
                                                        <XCircle className="w-4 h-4 mr-1" />
                                                        暂时缺货
                                                    </span>
                                                )}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                分类
                                            </dt>
                                            <dd className="mt-1">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                                                    <Package className="w-4 h-4 mr-1" />
                                                    {product?.category}
                                                </span>
                                            </dd>
                                        </div>
                                    </div>
                                </div>

                                {/* 详细信息卡片 */}
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="p-4 rounded-lg 0">
                                            <div className="text-xs text-gray-500 mb-1">
                                                当前库存
                                            </div>
                                            <div className="text-2xl font-bold">
                                                {product?.quantity || 0} 件
                                            </div>
                                        </div>
                                        <div className=" p-4 rounded-lg ">
                                            <div className="text-xs text-gray-500 mb-1">
                                                销售单价
                                            </div>
                                            <div className="text-2xl font-bold text-blue-600">
                                                ¥{" "}
                                                {Number(
                                                    product?.price
                                                )?.toFixed(2) || "0.00"}
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-lg ">
                                            <div className="text-xs text-gray-500 mb-1">
                                                预计销售额
                                            </div>
                                            <div className="text-2xl font-bold text-green-600">
                                                ¥{" "}
                                                {Number(
                                                    product?.price *
                                                        product?.quantity
                                                )?.toFixed(2) || "0.00"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 时间信息 */}
                                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <dt className="text-gray-500">
                                                创建时间
                                            </dt>
                                            <dd className="mt-1 text-gray-600">
                                                {new Date(
                                                    product?.createdAt
                                                ).toLocaleString("zh-CN")}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-500">
                                                最后更新
                                            </dt>
                                            <dd className="mt-1 text-gray-600">
                                                {new Date(
                                                    product?.updatedAt
                                                ).toLocaleString("zh-CN")}
                                            </dd>
                                        </div>
                                    </div>
                                </div>

                                {/* 库存预警卡片 */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-900">
                                    库存健康度
                                </h3>
                                <Info className="w-4 h-4 text-gray-400" />
                            </div>

                            <div className="space-y-4">
                                {/* 库存进度条 */}
                                <div className="relative pt-2">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block text-blue-600">
                                                当前库存 {product?.quantity} 件
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-semibold inline-block text-green-600">
                                                安全库存{" "}
                                                {product?.safetyStock || 50} 件
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 rounded-full bg-gray-100">
                                        <div
                                            className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                                            style={{
                                                width: `${Math.min(
                                                    (product?.quantity /
                                                        (product?.safetyStock ||
                                                            50)) *
                                                        100,
                                                    100
                                                )}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* 补货建议 */}
                                <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                                    <AlertTriangle className="w-5 h-5 text-orange-400 mr-2" />
                                    <div className="text-sm text-orange-700">
                                        {product?.quantity <= 10 ? (
                                            <span>库存紧张！建议立即补货</span>
                                        ) : product?.quantity <= 30 ? (
                                            <span>
                                                库存适中，建议关注销售情况
                                            </span>
                                        ) : (
                                            <span>
                                                库存充足，保持当前销售节奏
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>
                        </div>

                        

                        {/* 描述区域 */}
                        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                产品描述
                            </h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {product?.description || "暂无详细描述"}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default ProductDetailPage;
