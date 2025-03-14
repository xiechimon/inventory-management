import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService from "./productService";

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    message: "",
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

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        CALC_STORE_VALUE(state, action) {
            console.log("存储值");
        },
    },
    extraReducers: (builder) => {
        builder
            // 添加库存
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.products.push(action.payload);
                toast.success("库存添加成功");
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            // 获取库存
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isError = false;
                console.log("Request succeed:", action.payload); // 打印错误信息
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
    },
});

export const { CALC_STORE_VALUE } = productSlice.actions;

export default productSlice.reducer;
