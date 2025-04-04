import {
    Brain,
    HousePlus,
    LayoutDashboard,
    Menu,
    MessageCircle,
    UserPlus,
    UserRound,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const SIDEBAR_ITEMS = [
    { name: "仪表盘", icon: LayoutDashboard, href: "/dashboard" },
    { name: "添加库存", icon: HousePlus, href: "/add-product" },
    { name: "用户管理", icon: UserPlus, href: "/user-management" },
    { name: "资料", icon: UserRound, href: "/profile" },
    { name: "问题反馈", icon: MessageCircle, href: "/report-us" },
    { name: "AI", icon: Brain , href: "/robot"}
];

const Sidebar = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
                isSidebarOpen ? "w-64" : "w-20"
            }`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
        >
            <div className="h-full bg-gray-400 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-400">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-full hover:bg-gray-300 transition-colors max-w-fit"
                >
                    <Menu size={24} />
                </motion.button>

                <nav className="mt-8 flex-grow">
                    {SIDEBAR_ITEMS.map((item) => (
                        <Link key={item.href} to={item.href}>
                            <motion.div
                                className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors mb-2 ${
                                    location.pathname.startsWith(item.href)
                                        ? "bg-gray-400" 
                                        : ""
                                }`}
                            >
                                <item.icon
                                    size={20}
                                    style={{
                                        color: item.color,
                                        minWidth: "20px",
                                    }}
                                />
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.span
                                            className="ml-4 whitespace-nowrap"
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{
                                                opacity: 1,
                                                width: "auto",
                                            }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{
                                                duration: 0.2,
                                                delay: 0.3,
                                            }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    ))}
                </nav>
            </div>
        </motion.div>
    );
};

export default Sidebar;
