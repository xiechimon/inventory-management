import { useEffect } from "react";
import { getLoginStatus } from "../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const useRedirectLoginUser = (path) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const redirectLoginUser = async () => {
            const isLoggedIn = await getLoginStatus();

            dispatch(SET_LOGIN(isLoggedIn));

            if (isLoggedIn) {
                toast.warn("您已经登录");
                navigate(path);
                return;
            }
        };

        redirectLoginUser();
    }, [navigate, path, dispatch]);
};

export default useRedirectLoginUser;
