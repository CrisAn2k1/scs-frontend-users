import { Link } from "react-router-dom";
import React, { useState, useCallback, useContext, lazy, Suspense } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Loading from "../../layouts/Loading";

import "./css/util.css";
import "./css/main.css";

const AlertMessage = lazy(() => import("../../../components/layouts/AlertMessage"));

const LoginForm = () => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (isAuthenticated) {
        window.location.href = "http://localhost:5000/";
    }

    const { loginUser } = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const [alert, setAlert] = useState(null);
    const { email, password } = loginForm;

    const onChangeLoginForm = useCallback(
        (event) => {
            setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
        },
        [loginForm],
    );

    const showPassword = () => {
        var typeOfPass = document.getElementById("inputPassword");
        if (typeOfPass.type === "password") {
            typeOfPass.type = "text";
        } else {
            typeOfPass.type = "password";
        }
    };
    const onSubmit = useCallback(async (event) => {
        console.log(email + " :: " + password);
        event.preventDefault();
        if (!email) {
            setAlert({
                type: "error",
                message: "Vui lòng nhập Username",
            });
            setTimeout(() => setAlert(null), 30000);
            return;
        }
        if (!password) {
            setAlert({
                type: "error",
                message: "Vui lòng nhập Password",
            });
            setTimeout(() => setAlert(null), 30000);
            return;
        }
        if (process.env.NODE_ENV !== "production") {
            try {
                const loginData = await loginUser(loginForm);

                if (!loginData.success) {
                    setAlert({ type: "error", message: loginData.message });
                    setTimeout(() => setAlert(null), 30000);
                }
            } catch (error) {
                console.log(error);
            }
        }
    });
    return (
        <div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form" onSubmit={onSubmit}>
                            <span
                                style={{ letterSpacing: "5px" }}
                                className="login100-form-title p-b-43"
                            >
                                LOGIN
                            </span>
                            <Suspense fallback={<Loading />}>
                                <AlertMessage info={alert} />
                            </Suspense>
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
                                <input
                                    className="input100"
                                    placeholder="Username"
                                    type="text"
                                    name="email"
                                    onChange={onChangeLoginForm}
                                    value={email}
                                />
                                <span className="focus-input100" />
                            </div>
                            <div
                                className="wrap-input100 validate-input"
                                data-validate="Password is required"
                            >
                                <input
                                    className="input100"
                                    name="password"
                                    id="inputPassword"
                                    onChange={onChangeLoginForm}
                                    placeholder="Password"
                                    value={password}
                                    type="password"
                                />

                                <span className="focus-input100" />
                            </div>

                            <div className="flex-sb-m w-full p-t-3 p-b-32">
                                <div style={{ position: "absolute", right: 65 }}>
                                    <a href="#" className="txt1">
                                        Forgot Password?
                                    </a>
                                </div>
                                <div style={{ marginLeft: 10, display: "flex" }}>
                                    <input
                                        style={{ cursor: "pointer" }}
                                        id="show_password"
                                        type="checkbox"
                                        onClick={showPassword}
                                    />
                                    <label
                                        style={{ cursor: "pointer", marginLeft: 10 }}
                                        for="show_password"
                                    >
                                        Show Password
                                    </label>
                                </div>
                            </div>
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" type="submit">
                                    Login
                                </button>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "30px",
                                }}
                            >
                                <Link to={"/register"}>
                                    Don't have an account? <strong> Register </strong>{" "}
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

export default LoginForm;
