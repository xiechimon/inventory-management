import React, { useState } from "react";
import styles from "./auth.module.css";

const Auth = () => {
    const [action, setAction] = useState("");

    const registerLink = () => {
        setAction(" active");
    };

    const loginLink = () => {
        setAction("");
    };

    return (
        <div className={`${styles.wrapper} ${action ? styles.active : ''}`}>
            <div className={styles['form-header']}>
                <div className={styles.titles}>
                    <div className={styles['title-login']}>登录</div>
                    <div className={styles['title-register']}>注册</div>
                </div>
            </div>
            {/*  LOGIN FORM */}
            <form action="#" className={styles['login-form']} autocomplete="off">
                <div className={styles['input-box']}>
                    <input
                        type="text"
                        className={styles['input-field']}
                        id="log-email"
                        name="email"
                        required
                    />

                    <label htmlFor="log-email" className={styles.label}>
                        邮箱
                    </label>
                    <i className={`bx bx-envelope ${styles.icon}`}></i>
                </div>
                <div className={styles['input-box']}>
                    <input
                        type="password"
                        className={styles['input-field']}
                        id="log-pass"
                        name="password"
                        required
                    />
                    <label htmlFor="log-pass" className={styles.label}>
                        密码
                    </label>
                    <i className={`bx bx-lock-alt ${styles.icon}`}></i>
                </div>
                <div className={styles['form-cols']}>
                    <div className={styles['col-1']}></div>
                    <div className={styles['col-2']}>
                        {/* <a href="#">忘记密码？</a> */}
                    </div>
                </div>
                <div className={styles['input-box']}>
                    <button className={styles['btn-submit']} id="SignInBtn" type="submit">
                        登录 <i className="bx bx-log-in"></i>
                    </button>
                </div>
                <div className={styles['switch-form']}>
                    <span>
                        没有账户？
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" onClick={registerLink}>
                            注册
                        </a>
                    </span>
                </div>
            </form>

            {/* REGISTER FORM */}
            <form action="#" className={styles['register-form']} autocomplete="off">
                <div className={styles['input-box']}>
                    <input
                        type="text"
                        className={styles['input-field']}
                        id="reg-name"
                        name="name"
                        required
                    />
                    <label htmlFor="reg-name" className={styles.label}>
                        用户名
                    </label>
                    <i className={`bx bx-user ${styles.icon}`}></i>
                </div>
                <div className={styles['input-box']}>
                    <input
                        type="type"
                        className={styles['input-field']}
                        id="reg-email"
                        name="email"
                        required
                    />
                    <label htmlFor="reg-email" className={styles.label}>
                        邮箱
                    </label>
                    <i className={`bx bx-envelope ${styles.icon}`}></i>
                </div>
                <div className={styles['input-box']}>
                    <input
                        type="password"
                        className={styles['input-field']}
                        id="reg-pass"
                        name="password"
                        required
                    />
                    <label htmlFor="reg-pass" className={styles.label}>
                        密码
                    </label>
                    <i className={`bx bx-lock-alt ${styles.icon}`}></i>
                </div>
                <div className={styles['input-box']}>
                    <input
                        type="password"
                        className={styles['input-field']}
                        id="reg-pass"
                        name="password"
                        required
                    />
                    <label htmlFor="reg-pass" className={styles.label}>
                        确认密码
                    </label>
                    <i className={`bx bxs-lock-alt ${styles.icon}`}></i>
                </div>
                <div className={styles['form-cols']}>
                    <div className={styles['cols-2']}></div>
                </div>
                <div className={styles['input-box']}>
                    <button className={styles['btn-submit']} id="SignUpBtn" type="submit">
                        注册 <i className="bx bx-user-plus"></i>
                    </button>
                </div>
                <div className={styles['switch-form']}>
                    <span>
                        已拥有账户？
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" onClick={loginLink}>
                            登录
                        </a>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Auth;
