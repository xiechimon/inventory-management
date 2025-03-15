import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Edit, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import SearchBox from "../common/SearchBox";
import ReactPaginate from "react-paginate";
import {
    FILTER_PRODUCTS,
    selectFilterProducts,
} from "../../redux/features/product/filterSlice";
import {
    getProducts,
    delProduct,
} from "../../redux/features/product/productSlice";

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

    // 删除产品
    const deleteProduct = async (id) => {
        await dispatch(delProduct(id));
        await dispatch(getProducts());
    };

    const confirmDel = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
                            <div className="flex flex-col items-center mb-4">
                                {/* 警示图标 */}
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                    <div className="w-6 h-6 bg-red-500 rounded-full relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-3 bg-white" />
                                    </div>
                                </div>

                                {/* 标题和内容 */}
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    删除确认
                                </h3>
                                <p className="text-gray-600 text-center">
                                    确定要永久删除此产品吗？此操作不可撤销。
                                </p>
                            </div>

                            {/* 操作按钮 */}
                            <div className="flex justify-between">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    取消
                                </button>

                                <button
                                    onClick={() => {
                                        deleteProduct(id);
                                        onClose();
                                    }}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm"
                                >
                                    确认删除
                                </button>
                            </div>
                        </div>
                    </div>
                );
            },
        });
    };

    // BEGIN Paginate
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5; // 每页显示的数量

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;

        setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, filteredProducts]);

    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * itemsPerPage) % filteredProducts.length;

        setItemOffset(newOffset);
    };
    // END Paginate

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
                            {currentItems.map((product, index) => {
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
                                                <Trash2
                                                    size={20}
                                                    onClick={() =>
                                                        confirmDel(_id)
                                                    }
                                                />
                                            </button>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="mt-6">
                <ReactPaginate
                    breakLabel={<span className="text-gray-300">...</span>}
                    nextLabel={
                        <div className="flex items-center group">
                            <span className="text-gray-500 group-hover:text-gray-700">
                                next
                            </span>
                            <ArrowRight className="ml-1 h-4 w-4 stroke-2 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                    }
                    previousLabel={
                        <div className="flex items-center group">
                            <ArrowLeft className="mr-1 h-4 w-4 stroke-2 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            <span className="text-gray-500 group-hover:text-gray-700">
                                prev
                            </span>
                        </div>
                    }
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    containerClassName="flex justify-center items-center gap-3 font-medium"
                    pageLinkClassName="px-2 py-1 text-gray-500 hover:text-gray-800 rounded-md transition-all duration-300 hover:bg-gray-100/30"
                    previousLinkClassName="hover:bg-transparent" // 移除父级容器的背景
                    nextLinkClassName="hover:bg-transparent"
                    breakLinkClassName="text-gray-400 cursor-default"
                    activeClassName="relative text-gray-900 before:absolute before:-bottom-1 before:left-1/2 before:w-5 before:h-0.5 before:bg-gray-300 before:-translate-x-1/2"
                    disabledClassName="opacity-40 cursor-not-allowed"
                    disabledLinkClassName="hover:bg-transparent"
                    pageClassName="hover:-translate-y-0.5 transition-transform" // 悬停微浮动
                />
            </div>
        </motion.div>
    );
};
export default ProductsTable;
