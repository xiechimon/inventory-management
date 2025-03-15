import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/products/`;

// 创建产品
export const createProduct = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

// 获取所有产品
export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// 获取单个产品
export const getSingleProduct = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
};

// 删除产品
export const delProduct = async (id) => {
    const response = await axios.delete(API_URL + id);
    return response.data;
};

// 更新产品信息
export const updateProduct = async (id, formData) => {
    const response = await axios.patch(`${API_URL}${id}`, formData);
    return response.data;
};

const productService = {
    createProduct,
    getProducts,
    getSingleProduct,
    delProduct,
    updateProduct,
};

export default productService;
