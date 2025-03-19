import { createSlice } from "@reduxjs/toolkit";

// 从 localStorage 中读取 name
// const getNameFromLocalStorage = () => {
//     try {
//         const name = localStorage.getItem("name");

//         // 如果 name 不存在或为空字符串，返回默认值
//         if (!name || name === "undefined" || name === "null") {
//             return "";
//         }

//         // 尝试解析 JSON
//         const parsedName = JSON.parse(name);
//         return parsedName || ""; // 如果解析结果为 null 或 undefined，返回默认值
//     } catch (error) {
//         console.error("Failed to parse name from localStorage:", error);
//         return ""; // 如果解析失败，返回默认值
//     }
// };
const name = JSON.parse(localStorage.getItem("name"));
const initialState = {
    isLoggedIn: false,
    name: name ? name : "",
    user: {
        name: "",
        email: "",
        phone: "",
        bio: "",
        photo: "",
    },
    userID: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_LOGIN(state, action) {
            state.isLoggedIn = action.payload;
        },
        SET_NAME(state, action) {
            localStorage.setItem("name", JSON.stringify(action.payload)); // 存储为 JSON 字符串
            state.name = action.payload;
        },
        SET_USER(state, action) {
            const profile = action.payload;
            state.user.name = profile.name;
            state.user.email = profile.email;
            state.user.phone = profile.phone;
            state.user.bio = profile.bio;
            state.user.photo = profile.photo;
        },
    },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
