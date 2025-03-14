import { motion } from "framer-motion";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import SearchBox from "../common/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import {
    FILTER_PRODUCTS,
    selectFilterProducts,
} from "../../redux/features/product/filterSlice";

const ProductsTable = ({ products }) => {
    // 搜索框过滤
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const filteredProducts = useSelector(selectFilterProducts);

    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortenedText = text.substring(0, n).concat("...");
            return shortenedText;
        }
        return text;
    };

    useEffect(() => {
        dispatch(FILTER_PRODUCTS({ products, search }));
    }, [products, search, dispatch]);

    return (
        <motion.div
            className="bg-gray-200 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                    库存列表
                </h2>

                <SearchBox
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                {products.length === 0 ? (
                    <p>没有商品，请添加...</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    序号
                                </th>
                                <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    名称
                                </th>
                                <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    分类
                                </th>
                                <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    单价
                                </th>
                                <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    库存量
                                </th>
                                <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    销售额
                                </th>
                                <th className=" px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    操作
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-300">
                            {/* {filteredProducts.map((product) => (
                                <motion.tr
                                    key={product.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex gap-2 items-center">
                                        <img
                                            src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
                                            alt="Product img"
                                            className="size-10 rounded-full"
                                        />
                                        {product.name}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {product.category}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        ${product.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {product.stock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {product.sales}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <button className="text-indigo-600 hover:text-indigo-700 mr-2">
                                            <Edit size={18} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))} */}
                            {filteredProducts.map((product, index) => {
                                const { _id, name, category, price, quantity } =
                                    product;
                                return (
                                    <motion.tr
                                        key={_id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        whileHover={{
                                            backgroundColor: "#BFC4CC",
                                        }}
                                    >
                                        <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-4 items-center">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {shortenText(name, 6)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {"¥ "}
                                            {price}
                                        </td>
                                        <td className="px-10 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {quantity}
                                        </td>
                                        <td className="px-7 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {"¥ "}
                                            {price * quantity}
                                        </td>
                                        <td className="text-center py-4 whitespace-nowrap text-sm text-gray-700">
                                            <button className="text-blue-500 hover:text-blue-700 mr-2">
                                                <Eye size={20} />
                                            </button>
                                            <button className="text-indigo-500 hover:text-indigo-700 mr-2">
                                                <Edit size={20} />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700">
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </motion.div>
    );
};
export default ProductsTable;
