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
export const logoutUser = async (userData) => {
    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`);
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
