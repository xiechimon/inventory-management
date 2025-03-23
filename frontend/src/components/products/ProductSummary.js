import React, { useEffect } from "react";
import { BadgeJapaneseYen, Ban, ShoppingBag, Tag } from "lucide-react";
import StatCard from "../common/StatCard";
import { motion } from "framer-motion";
import {
    CALC_CATEGORY,
    CALC_OUTOFSTOCK,
    CALC_STORE_VALUE,
    selectCategory,
    selectOutOfStock,
    selectTotalStoreValue,
} from "../../redux/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

// 格式化销售额
export const formatNumbers = (x) => {
    // 对于大数值，使用简化显示（如：1,234,567.89 -> 123.46万）
    // if (x >= 10000) {
    //     return (x / 10000).toFixed(2) + "万";
    // }
    
    // 保留两位小数，并添加千位分隔符
    return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
    const dispatch = useDispatch();
    const totalStoreValue = useSelector(selectTotalStoreValue);
    const outOfStock = useSelector(selectOutOfStock);
    const allCategories = useSelector(selectCategory);

    useEffect(() => {
        // 使用函数
        dispatch(CALC_STORE_VALUE(products));
        dispatch(CALC_OUTOFSTOCK(products));
        dispatch(CALC_CATEGORY(products));
    }, [dispatch, products]);

    return (
        <div>
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
                    value={products.length}
                    backgroundColor="#851EB8FF"
                />
                <StatCard
                    name="总销售额"
                    icon={BadgeJapaneseYen}
                    value={`¥ ${formatNumbers(totalStoreValue)}`}
                    backgroundColor="#32963D"
                />
                <StatCard
                    name="缺货"
                    icon={Ban}
                    value={outOfStock}
                    backgroundColor="#C51848"
                />
                <StatCard
                    name="所有类别"
                    icon={Tag}
                    value={allCategories}
                    backgroundColor="#00476DFF"
                />
            </motion.div>
        </div>
    );
};

export default ProductSummary;
