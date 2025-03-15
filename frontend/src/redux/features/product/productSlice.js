import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService from "./productService";

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    message: "",
    totalStoreValue: 0,
    outOfStock: 0,
    category: 0,
};

// 创建新产品
export const createProduct = createAsyncThunk(
    "products/create",
    async (formData, thunkAPI) => {
        try {
            return await productService.createProduct(formData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// 获取所有产品
export const getProducts = createAsyncThunk(
    "products/getAll",
    async (_, thunkAPI) => {
        try {
            return await productService.getProducts();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// 获取单个产品
export const getOneProduct = createAsyncThunk(
    "products/getOne",
    async (id, thunkAPI) => {
        try {
            return await productService.getSingleProduct(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// 删除产品
export const delProduct = createAsyncThunk(
    "products/delete",
    async (id, thunkAPI) => {
        try {
            return await productService.delProduct(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// 更新产品信息
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, formData }, thunkAPI) => {
        try {
            return await productService.updateProduct(id, formData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // 计算总销售额
        CALC_STORE_VALUE(state, action) {
            const products = action.payload;
            const array = []; // 每个商品的销售额
            products.map((item) => {
                const { price, quantity } = item;
                const productValue = price * quantity;
                return array.push(productValue);
            });

            const totalValue = array.reduce((a, b) => {
                return a + b;
            }, 0);
            state.totalStoreValue = totalValue;
        },
        // 计算缺货
        CALC_OUTOFSTOCK(state, action) {
            const products = action.payload;
            const array = [];
            products.map((item) => {
                const { quantity } = item;
                return array.push(quantity);
            });

            let count = 0;

            array.forEach((number) => {
                if (number === 0 || number === "0") {
                    count += 1;
                }
            });
            state.outOfStock = count;
        },
        // 计算全部类别
        CALC_CATEGORY(state, action) {
            const products = action.payload;
            const array = [];
            products.map((item) => {
                const { category } = item;
                return array.push(category);
            });

            const uniqueSet = new Set(array); // 去重
            state.category = uniqueSet.size;
        },
    },
    extraReducers: (builder) => {
        builder
            // 添加库存
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isError = false;
                // console.log(action.payload);
                state.products.push(action.payload);
                toast.success("库存添加成功");
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            // 获取所有库存
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isError = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            // 获取单个库存
            .addCase(getOneProduct.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isError = false;
                // console.log("Request succeed:", action.payload); // 打印错误信息
                state.product = action.payload;
            })
            .addCase(getOneProduct.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            // 删除产品
            .addCase(delProduct.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isError = false;
                toast.success("物品删除成功");
            })
            .addCase(delProduct.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            // 更新产品
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isError = false;
                toast.success("物品更新成功");
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            });
    },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } =
    productSlice.actions;

export const selectProduct = (state) => state.product.product;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectCategory = (state) => state.product.category;

export default productSlice.reducer;
