import { useEffect, useRef } from "react";
import { getLoginStatus } from "../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const useRedirectLoginUser = (path) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 使用 ref 来跟踪是否已经显示过提示
    const hasShownToast = useRef(false);

    useEffect(() => {
        const redirectLoginUser = async () => {
            const isLoggedIn = await getLoginStatus();
            
            dispatch(SET_LOGIN(isLoggedIn));

            if (isLoggedIn) {
                // 只在第一次显示提示
                if (!hasShownToast.current) {
                    toast.warn("您已经登录");
                    hasShownToast.current = true;
                }
                navigate(path);
                return;
            }
        };

        redirectLoginUser();
    }, [navigate, path, dispatch]);
};

export default useRedirectLoginUser;
