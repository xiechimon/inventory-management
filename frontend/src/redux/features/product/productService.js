import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/products`;

// 创建产品
export const createProduct = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

// 获取产品
export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const productService = {
    createProduct,
    getProducts,
};

export default productService;
