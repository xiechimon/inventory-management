import axios from "axios";
import { BACKEND_URL } from "./authService";
import { toast } from "react-toastify";

const API_URL = `${BACKEND_URL}/api/contactus/`;

// 问题反馈
export const ReportUs = async (formData) => {
    try {
        const response = await axios.post(API_URL, formData);
        toast.success("反馈提交成功!");
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
