import React from "react";

import "./css/util.css";
import "./css/main.css";
import { Link } from "react-router-dom";
const RegisterForm = () => {
    return (
        <div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form
                            className="login100-form validate-form"
                            style={{ padding: "32px ", paddingTop: "22px" }}
                        >
                            <span
                                style={{ letterSpacing: "5px" }}
                                className="login100-form-title p-b-43"
                            >
                                REGISTER
                            </span>
                            <div style={{ position: "absolute", right: 20, top: 15 }}>
                                <a
                                    style={{ borderRadius: "15px" }}
                                    className="login100-form-btn back-to-home"
                                    href="/"
                                >
                                    Home
                                </a>
                            </div>
                            <div
                                className="wrap-input100 validate-input"
                                data-validate="Valid email is required: ex@abc.xyz"
                            >
                                <input className="input100" type="text" name="email" />
                                <span className="focus-input100" />
                                <span className="label-input100">FullName</span>
                            </div>
                            <div
                                className="wrap-input100 validate-input"
                                data-validate="Valid email is required: ex@abc.xyz"
                            >
                                <input className="input100" type="text" name="email" />
                                <span className="focus-input100" />
                                <span className="label-input100">Email</span>
                            </div>
                            <div
                                className="wrap-input100 validate-input"
                                data-validate="Password is required"
                            >
                                <input className="input100" type="password" name="pass" />
                                <span className="focus-input100" />
                                <span className="label-input100">Password</span>
                            </div>
                            <div
                                className="wrap-input100 validate-input"
                                data-validate="Password is required"
                            >
                                <input className="input100" type="password" name="pass" />
                                <span className="focus-input100" />
                                <span className="label-input100">ConfirmPassword</span>
                            </div>
                            <div
                                className="wrap-input100 validate-input"
                                data-validate="Password is required"
                            >
                                <input className="input100" type="password" name="pass" />
                                <span className="focus-input100" />
                                <span className="label-input100">Phone</span>
                            </div>
                            <br />
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">Register</button>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "30px",
                                }}
                            >
                                <Link to={"/login"}>
                                    Have an account?<strong> Login</strong>{" "}
                                </Link>
                            </div>
                        </form>
                        <div
                            className="login100-more"
                            style={{
                                backgroundImage: 'url("img/charity.png")',
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
