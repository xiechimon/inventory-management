import { useEffect } from "react";
import { getLoginStatus } from "../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const redirectLoggedOutUser = async () => {
            const isLoggedIn = await getLoginStatus();

            dispatch(SET_LOGIN(isLoggedIn));

            if (!isLoggedIn) {
                toast.warn("认证已过期，请重新登录");
                navigate(path);
                return;
            }
        };

        redirectLoggedOutUser();
    }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
