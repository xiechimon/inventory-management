import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// 注册
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/users/register`,
            userData,
            {
                withCredentials: true,
            }
        );

        if (response.statusText === "OK") {
            toast.success("用户注册成功");
        }

        return response.data;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

// 登录
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/users/login`,
            userData
        );

        if (response.statusText === "OK") {
            toast.success("用户登录成功");
        }

        return response.data;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

// 登出
export const logoutUser = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/logout`);
        if (response.statusText === "OK") {
            toast.info("退出登录成功");
        }
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

// 获取登录信息
export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
        return response.data;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

// 获取用户信息
export const getUser = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/getuser`);
        return response.data;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

// 更新用户信息
export const updateUser = async (formData) => {
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/api/users/updateuser`,
            formData
        );
        return response.data;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

// 更改密码
export const changePassword = async (formData) => {
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/api/users/changepassword`,
            formData
        );
        return response.data;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};
