import React, { useState } from "react";
import "./auth.css";

const Auth = () => {
    const [action, setAction] = useState("");

    const registerLink = () => {
        setAction(" active");
    };

    const loginLink = () => {
        setAction("");
    };

    return (
        <div className={`wrapper${action}`}>
            <div className="form-header">
                <div className="titles">
                    <div className="title-login">登录</div>
                    <div className="title-register">注册</div>
                </div>
            </div>
            {/*  LOGIN FORM */}
            <form action="#" className="login-form" autocomplete="off">
                <div className="input-box">
                    <input
                        type="text"
                        className="input-field"
                        id="log-email"
                        name="email"
                        required
                    />
                    <label htmlFor="log-email" className="label">
                        邮箱
                    </label>
                    <i className="bx bx-envelope icon"></i>
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        className="input-field"
                        id="log-pass"
                        name="password"
                        required
                    />
                    <label htmlFor="log-pass" className="label">
                        密码
                    </label>
                    <i className="bx bx-lock-alt icon"></i>
                </div>
                <div className="form-cols">
                    <div className="col-1"></div>
                    <div className="col-2">
                        {/* <a href="#">忘记密码？</a> */}
                    </div>
                </div>
                <div className="input-box">
                    <button className="btn-submit" id="SignInBtn" type="submit">
                        登录 <i className="bx bx-log-in"></i>
                    </button>
                </div>
                <div className="switch-form">
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
            <form action="#" className="register-form" autocomplete="off">
                <div className="input-box">
                    <input
                        type="text"
                        className="input-field"
                        id="reg-name"
                        name="name"
                        required
                    />
                    <label htmlFor="reg-name" className="label">
                        用户名
                    </label>
                    <i className="bx bx-user icon"></i>
                </div>
                <div className="input-box">
                    <input
                        type="type"
                        className="input-field"
                        id="reg-email"
                        name="email"
                        required
                    />
                    <label htmlFor="reg-email" className="label">
                        邮箱
                    </label>
                    <i className="bx bx-envelope icon"></i>
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        className="input-field"
                        id="reg-pass"
                        name="password"
                        required
                    />
                    <label htmlFor="reg-pass" className="label">
                        密码
                    </label>
                    <i className="bx bx-lock-alt icon"></i>
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        className="input-field"
                        id="reg-pass"
                        name="password"
                        required
                    />
                    <label htmlFor="reg-pass" className="label">
                        确认密码
                    </label>
                    <i className="bx bxs-lock-alt icon"></i>
                </div>
                <div className="form-cols">
                    <div className="col-2"></div>
                </div>
                <div className="input-box">
                    <button className="btn-submit" id="SignUpBtn" type="submit">
                        注册 <i className="bx bx-user-plus"></i>
                    </button>
                </div>
                <div className="switch-form">
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
