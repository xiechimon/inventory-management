import { motion } from "framer-motion";

const StatCard = ({ name, icon: Icon, value, backgroundColor }) => {
    return (
        <motion.div
            className="relative overflow-hidden shadow-lg rounded-xl "
            style={{
                backgroundColor: backgroundColor || "rgba(243, 244, 246, 0.5)", // 自定义背景
            }}
            whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
            }}
        >
            {/* 图标容器 */}
            <div
                className="absolute left-0 top-0 h-full w-20 flex items-center justify-center"
                
            >
                <Icon
                    size={40} // 放大图标尺寸
                    className="opacity-80"
                    color="white" // 使用传入的颜色
                />
            </div>

            {/* 内容 */}
            <div className="ml-20 px-4 py-5 sm:p-6">
                <span className="block text-sm font-medium text-gray-50">
                    {name}
                </span>
                <p className="mt-1 text-3xl font-semibold text-white">
                    {value}
                </p>
            </div>
        </motion.div>
    );
};
export default StatCard;
