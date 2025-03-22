import axios from "axios";
import { BACKEND_URL } from "./authService";
import { toast } from "react-toastify";

const API_URL = `${BACKEND_URL}/api/users/`;

// 获取所有用户
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL + "all");
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    throw new Error(message);
  }
};

// 删除用户
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(API_URL + userId);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    throw new Error(message);
  }
};

const userService = {
  getAllUsers,
  deleteUser,
};

export default userService;