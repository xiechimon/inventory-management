import React, { useState, useEffect } from "react";
import styles from "./auth.module.css";
import { toast } from "react-toastify";
import {
    loginUser,
    registerUser,
    validateEmail,
} from "../../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import useRedirectLoginUser from "../../customHook/useRedirectLoginUser";

const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
};

const Auth = () => {
    // 使用hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useRedirectLoginUser("/dashboard");

    // 添加背景动画效果
    const [animItems, setAnimItems] = useState([]);

    useEffect(() => {
        // 创建背景动画元素
        const items = [];
        const icons = [
            "box",
            "package",
            "clipboard",
            "truck",
            "archive",
            "barcode",
            "cart",
            "store",
            "cabinet",
            "server",
            "data",
            "chart",
        ];

        // 增加元素数量从15到25
        for (let i = 0; i < 25; i++) {
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            items.push({
                id: i,
                icon: randomIcon,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                size: `${Math.random() * 2 + 1}rem`, // 增大图标尺寸范围
                duration: `${Math.random() * 15 + 8}s`, // 缩短动画时间使运动更快
                delay: `${Math.random() * 5}s`,
                rotate: Math.random() > 0.5, // 随机决定是否旋转
                direction: Math.random() > 0.5 ? 'normal' : 'reverse', // 随机动画方向
                scale: 0.8 + Math.random() * 0.5, // 添加缩放变化
            });
        }

        setAnimItems(items);
    }, []);

    // 切换登录和注册，切换时重置数据
    const [action, setAction] = useState("");
    const registerLink = () => {
        setformData(initialState);
        setAction(" active");
    };
    const loginLink = () => {
        setformData(initialState);
        setAction("");
    };

    const [formData, setformData] = useState(initialState); // 存储表单数据
    const { name, email, password, password2 } = formData; // 从 formData 中解构出各个字段的值，方便在代码中直接使用。

    const handleInputChange = (e) => {
        // 更新表单中的值
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };

    const register = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            return toast.error("必须填写所有字段！");
        }
        if (password.length < 6) {
            return toast.error("密码长度必须大于6个字符！");
        }
        if (!validateEmail(email)) {
            return toast.error("请输入合法的邮箱！");
        }
        if (password !== password2) {
            return toast.error("两次密码输入不一致，请检查！");
        }

        const userData = {
            name,
            email,
            password,
        };
        try {
            const data = await registerUser(userData);
            // console.log(data);
            await dispatch(SET_LOGIN(true));
            await dispatch(SET_NAME(data.name));
            // navigate("/dashboard");
            toast.success("用户注册成功");
            // 切换到登录
            loginLink();
        } catch (error) {
            console.log(error.message);
        }
    };
    const login = async (e) => {
        e.preventDefault();

        if (!name || !password) {
            return toast.error("必须填写所有字段！");
        }
        if (password.length < 6) {
            return toast.error("密码长度必须大于6个字符！");
        }

        const userData = {
            name,
            password,
        };
        try {
            const data = await loginUser(userData);
            console.log(data);

            await dispatch(SET_LOGIN(true));
            await dispatch(SET_NAME(data.name));
            navigate("/dashboard");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className={styles.authcontainer}>
            {/* 添加动态背景元素 */}
            <div className={styles.backgroundElements}>
                {animItems.map((item) => (
                    <i
                        key={item.id}
                        className={`bx bx-${item.icon} ${styles.bgIcon} ${item.rotate ? styles.rotate : ''}`}
                        style={{
                            left: item.left,
                            top: item.top,
                            fontSize: item.size,
                            animationDuration: item.duration,
                            animationDelay: item.delay,
                            animationDirection: item.direction,
                            transform: `scale(${item.scale})`,
                            opacity: 0.6 + Math.random() * 0.4, // 添加不同透明度
                        }}
                    ></i>
                ))}
            </div>

            {/* 添加装饰性标题 */}
            <div className={styles.decorativeTitle}>
                <h1>库存管理系统</h1>
            </div>

            <div className={`${styles.wrapper} ${action ? styles.active : ""}`}>
                <div className={styles["form-header"]}>
                    <div className={styles.titles}>
                        <div className={styles["title-login"]}>登录</div>
                        <div className={styles["title-register"]}>注册</div>
                    </div>
                </div>

                {/*  LOGIN FORM */}
                <form
                    className={styles["login-form"]}
                    onSubmit={login}
                    autoComplete="off"
                >
                    <div className={styles["input-box"]}>
                        <input
                            type="text"
                            className={styles["input-field"]}
                            id="log-name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="log-name" className={styles.label}>
                            用户名
                        </label>
                        <i className={`bx bx-user ${styles.icon}`}></i>
                    </div>
                    <div className={styles["input-box"]}>
                        <input
                            type="password"
                            className={styles["input-field"]}
                            id="log-pass"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="log-pass" className={styles.label}>
                            密码
                        </label>
                        <i className={`bx bx-lock-alt ${styles.icon}`}></i>
                    </div>
                    <div className={styles["form-cols"]}>
                        <div className={styles["col-1"]}></div>
                        <div className={styles["col-2"]}>
                            {/* <a href="#">忘记密码？</a> */}
                        </div>
                    </div>
                    <div className={styles["input-box"]}>
                        <button
                            className={styles["btn-submit"]}
                            id="SignInBtn"
                            type="submit"
                        >
                            登录 <i className="bx bx-log-in"></i>
                        </button>
                    </div>
                    <div className={styles["switch-form"]}>
                        <span>
                            没有账户？
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a onClick={registerLink}>注册</a>
                        </span>
                    </div>
                </form>

                {/* REGISTER FORM */}
                <form
                    className={styles["register-form"]}
                    onSubmit={register}
                    autoComplete="off"
                >
                    <div className={styles["input-box"]}>
                        <input
                            type="text"
                            className={styles["input-field"]}
                            id="reg-name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="reg-name" className={styles.label}>
                            用户名
                        </label>
                        <i className={`bx bx-user ${styles.icon}`}></i>
                    </div>
                    <div className={styles["input-box"]}>
                        <input
                            type="type"
                            className={styles["input-field"]}
                            id="reg-email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="reg-email" className={styles.label}>
                            邮箱
                        </label>
                        <i className={`bx bx-envelope ${styles.icon}`}></i>
                    </div>
                    <div className={styles["input-box"]}>
                        <input
                            type="password"
                            className={styles["input-field"]}
                            id="reg-pass"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="reg-pass" className={styles.label}>
                            密码
                        </label>
                        <i className={`bx bx-lock-alt ${styles.icon}`}></i>
                    </div>
                    <div className={styles["input-box"]}>
                        <input
                            type="password"
                            className={styles["input-field"]}
                            id="reg-pass2"
                            name="password2"
                            value={formData.password2}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="reg-pass2" className={styles.label}>
                            确认密码
                        </label>
                        <i className={`bx bxs-lock-alt ${styles.icon}`}></i>
                    </div>
                    <div className={styles["form-cols"]}>
                        <div className={styles["cols-2"]}></div>
                    </div>
                    <div className={styles["input-box"]}>
                        <button
                            className={styles["btn-submit"]}
                            id="SignUpBtn"
                            type="submit"
                        >
                            注册 <i className="bx bx-user-plus"></i>
                        </button>
                    </div>
                    <div className={styles["switch-form"]}>
                        <span>
                            已拥有账户？
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a onClick={loginLink}>登录</a>
                        </span>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Auth;
