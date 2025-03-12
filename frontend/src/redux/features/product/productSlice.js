import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    message: "",
};

// 创建新产品
const createProduct = createAsyncThunk(
    "products/create",
    async (formData, thunkAPI) => {
        try {
            return await productSlice.createProduct(formData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue;
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
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isSuccess = true;
                console.log(action.payload);
                state.product.push(action.payload);
                toast.success("物品添加成功");
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
                toast.success(action.payload);
            });
    },
});

export const { CALC_STORE_VALUE } = productSlice.actions;

export default productSlice.reducer;
