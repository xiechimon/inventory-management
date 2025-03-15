import { motion } from "framer-motion";
import {
    UploadCloud,
    Package,
    JapaneseYen,
    Book,
    Hash,
    ArrowLeftCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductForm = ({
    product,
    productImage,
    imagePreview,
    description,
    setDescription,
    handleImageChange,
    handleInputChange,
    saveProduct,
}) => {
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value); // 从事件对象中提取输入值
    };

    const navigate = useNavigate();

    return (
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
            <motion.div
                className="bg-gray-200 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        添加库存
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

                <div className="overflow-x-auto">
                    <form className="space-y-6" onSubmit={saveProduct}>
                        {/* 图片上传 */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                产品图片
                            </label>
                            <div className="flex items-center justify-center">
                                <label
                                    htmlFor="product-image"
                                    className="group relative flex flex-col items-center justify-center 
                     w-full h-64 rounded-xl border-2 border-dashed border-gray-300 
                     hover:border-blue-500 transition-colors cursor-pointer
                     bg-white/70 backdrop-blur-sm overflow-hidden"
                                >
                                    {/* 图片预览 */}
                                    {imagePreview ? (
                                        <div className="absolute inset-0 flex items-center justify-center p-4">
                                            <div className="relative w-full h-full">
                                                <img
                                                    src={imagePreview}
                                                    alt="产品预览"
                                                    className="w-full h-full object-contain rounded-lg shadow-md"
                                                    style={{
                                                        maxWidth: "100%",
                                                        maxHeight: "100%",
                                                        aspectRatio: "1 / 1",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-2 text-center p-4">
                                            <UploadCloud className="w-8 h-8 text-gray-400 mx-auto" />
                                            <p className="text-sm text-gray-500">
                                                <span className="font-medium text-blue-600 hover:text-blue-500">
                                                    点击上传
                                                </span>{" "}
                                                或拖放图片
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                JPG, JPEG, PNG
                                            </p>
                                        </div>
                                    )}
                                </label>
                                <input
                                    id="product-image"
                                    type="file"
                                    name="image"
                                    className="hidden"
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageChange} // 绑定 handleImageChange
                                />
                            </div>
                        </div>

                        {/* 产品名称 */}
                        <div className="group relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                产品名称
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-600 transition-colors">
                                    <Package className="w-5 h-5" />
                                </div>

                                <input
                                    type="text"
                                    name="name"
                                    value={product?.name}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70
                                  placeholder:text-gray-400 text-gray-700 outline-none duration-200"
                                    placeholder="请输入产品名称"
                                />
                            </div>
                        </div>

                        {/* 类别选择 */}
                        <div className="group relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                产品类别
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-600 transition-colors">
                                    <Book className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    name="category"
                                    value={product?.category}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70
                                  placeholder:text-gray-400 text-gray-700 outline-none duration-200"
                                    placeholder="请输入产品类别"
                                />
                            </div>
                        </div>

                        {/* 产品价格 */}
                        <div className="group relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                单价
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500  group-focus-within:text-blue-600 transition-colors">
                                    <JapaneseYen className="w-5 h-5" />
                                </div>
                                <input
                                    type="number"
                                    name="price"
                                    value={product?.price}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70
                                  placeholder:text-gray-400 text-gray-700 outline-none duration-200"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        {/* 库存数量输入 */}
                        <div className="group relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                库存数量
                            </label>
                            <div className="relative flex items-center gap-2">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500  group-focus-within:text-blue-600 transition-colors">
                                    <Hash className="w-5 h-5" />
                                </div>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={product?.quantity}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-4 py-3 w-full rounded-xl border-2 border-gray-200 focus:border-blue-500 bg-white/70
                                  placeholder:text-gray-400 text-gray-700 outline-none duration-200"
                                    placeholder="0"
                                />
                                <span className="text-gray-500 text-m whitespace-nowrap">
                                    件
                                </span>
                            </div>
                        </div>

                        {/* 产品描述 */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                产品描述
                            </label>
                            <div className="p-[2px] rounded-xl  hover:from-blue-300 hover:to-purple-300 transition-all">
                                <textarea
                                    className="w-full px-4 py-3 rounded-xl border-2 
                                     focus:border-blue-500  bg-white/70 
                                     transition-all duration-200 resize-none outline-none"
                                    rows="5"
                                    placeholder="详细描述产品特性..."
                                    value={description}
                                    onChange={handleDescriptionChange}
                                ></textarea>
                            </div>
                        </div>

                        {/* 提交按钮 */}
                        <div className="pt-6 flex justify-end ">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700
                                text-white font-medium rounded-xl relative"
                            >
                                提交
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </main>
    );
};

export default ProductForm;
