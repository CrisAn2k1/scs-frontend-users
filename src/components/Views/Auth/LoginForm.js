import React, { Suspense, lazy, useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Loading from "../../layouts/Loading";

import axios from "axios";
import Swal from "sweetalert2";
import { apiUrl } from "../../../constants";
import "../User/assets/css/profile.css";
import "./css/main.css";
import "./css/util.css";

const AlertMessage = lazy(() => import("../../../components/layouts/AlertMessage"));
const loadPageHome = () => {
    window.location.href = window.location.href.replace(window.location.href.split("/")[3], "");
};

const LoginForm = () => {
    // Forgot Password From
    const [isLoading, setIsLoading] = useState(false);

    const [recoveryEmail, setRecoveryEmail] = useState();
    const [disableRecoveryEmail, setDisableRecoveryEmail] = useState(true);
    const onChangeRecoveryEmail = useCallback(
        (event) => {
            if (!event.target.value) {
                setDisableRecoveryEmail(true);
            } else {
                setDisableRecoveryEmail(false);
            }

            setRecoveryEmail(event.target.value);
        },
        [recoveryEmail],
    );

    const onSubmitRecoveryEmail = useCallback(async (event) => {
        event.preventDefault();

        setIsLoading(true);

        // if (process.env.NODE_ENV !== "production") {
        try {
            const recoveryEmailData = await axios.post(apiUrl + "/auth/forgot-password", {
                email: recoveryEmail,
            });

            if (recoveryEmailData?.data?.statusCode === 200) {
                localStorage.setItem("recoveryEmail", recoveryEmail);
                window.location.href =
                    process.env.NODE_ENV !== "production"
                        ? "http://localhost:5000/recovery-password"
                        : "https://scs-helpz.netlify.app/recovery-password";
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            if (error.response.data.statusCode) {
                Swal.fire({
                    position: "top-center",
                    icon: "warning",
                    title: "Warning",
                    text: "Email không đúng định dạng!",
                    showConfirmButton: true,
                    timer: 2000,
                });

                setIsLoading(false);

                return;
            }
            Swal.fire({
                position: "top-center",
                icon: "warning",
                title: "Warning",
                text: "Email không tồn tại!",
                showConfirmButton: true,
                timer: 2000,
            });
            setIsLoading(false);
        }
    });
    // Login Form
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    const navigate = useNavigate();

    if (isAuthenticated) {
        loadPageHome();
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
        setIsLoading(true);

        // if (process.env.NODE_ENV !== "production") {
        try {
            const loginData = await loginUser(loginForm);

            if (!loginData.success) {
                setAlert({ type: "error", message: loginData.message });
                setTimeout(() => setAlert(null), 10000);
                setIsLoading(false);

                return;
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
        // }
    });

    return (
        <div>
            <Loading hidden={!isLoading} />
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
                            <Suspense>
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
                                    type="email"
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
                                    <>
                                        {/* Button trigger modal */}
                                        <a
                                            style={{ fontSize: 16 }}
                                            href="#"
                                            className="txt1"
                                            type="button"
                                            data-toggle="modal"
                                            data-target="#exampleModalCenter"
                                        >
                                            Quên mật khẩu?
                                        </a>
                                        {/* Modal */}
                                        <div
                                            className="modal fade"
                                            id="exampleModalCenter"
                                            tabIndex={-1}
                                            role="dialog"
                                            aria-labelledby="exampleModalCenterTitle"
                                            aria-hidden="true"
                                        >
                                            <div
                                                className="modal-dialog modal-dialog-centered"
                                                role="document"
                                            >
                                                <div className="modal-content">
                                                    <div className="modal-body">
                                                        <div className="mainDiv">
                                                            <div className="cardStyle">
                                                                <form
                                                                    onSubmit={(event) => {
                                                                        event.preventDefault();
                                                                    }}
                                                                >
                                                                    <h2
                                                                        className="formTitle"
                                                                        style={{
                                                                            fontFamily: `"Comic Sans MS", "Poppins-Regular", "Arial", "Times"`,
                                                                        }}
                                                                    >
                                                                        Khôi Phục Mật Khẩu?
                                                                    </h2>
                                                                    <div className="inputDiv">
                                                                        <label
                                                                            className="inputLabel"
                                                                            htmlFor="emailRecovery"
                                                                        >
                                                                            Email
                                                                        </label>

                                                                        <input
                                                                            className="form-control"
                                                                            type="email"
                                                                            name="email"
                                                                            onChange={
                                                                                onChangeRecoveryEmail
                                                                            }
                                                                            value={recoveryEmail}
                                                                        />
                                                                    </div>

                                                                    <div className="buttonWrapper text-center">
                                                                        <button
                                                                            disabled={
                                                                                disableRecoveryEmail
                                                                            }
                                                                            type="submit"
                                                                            id="submitButton"
                                                                            onClick={
                                                                                onSubmitRecoveryEmail
                                                                            }
                                                                            className="btn btn-primary profile-button"
                                                                            style={{ width: "70%" }}
                                                                        >
                                                                            {isLoading
                                                                                ? "Vui lòng đợi!"
                                                                                : "Gửi Mã Xác Nhận"}
                                                                            <span id="loader" />
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            data-dismiss="modal"
                                                        >
                                                            Đóng
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                </div>
                                <div
                                    style={{
                                        marginLeft: 10,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <input
                                        style={{ cursor: "pointer" }}
                                        id="show_password"
                                        type="checkbox"
                                        onClick={showPassword}
                                    />
                                    <label
                                        style={{
                                            cursor: "pointer",
                                            marginLeft: 10,
                                        }}
                                        htmlFor="show_password"
                                    >
                                        Show Password
                                    </label>
                                </div>
                            </div>
                            <div className="container-login100-form-btn">
                                <button
                                    className="login100-form-btn"
                                    type="submit"
                                    disabled={isLoading}
                                >
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
