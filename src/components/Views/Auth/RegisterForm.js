import React, { Suspense, lazy, useCallback, useContext, useState } from "react";

import "./css/util.css";
import "./css/main.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Loading from "../../layouts/Loading";

const AlertMessage = lazy(() => import("../../../components/layouts/AlertMessage"));

const RegisterForm = () => {
    const { registerUser } = useContext(AuthContext);
    let navigate = useNavigate();
    const [registerForm, setRegisterForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        gender: "unknown",
        isActive: true,
    });
    const [alert, setAlert] = useState(null);
    const { fullName, email, password, confirmPassword, phone, address, isActive, gender } =
        registerForm;

    const onChangeRegisterForm = useCallback(
        (event) => {
            setRegisterForm({
                ...registerForm,
                [event.target.name]: event.target.value,
            });
        },
        [registerForm],
    );

    const onSubmit = useCallback(
        async (event) => {
            event.preventDefault();

            if (!fullName) {
                setAlert({
                    type: "error",
                    message: "Fullname is required",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            if (!email) {
                setAlert({
                    type: "error",
                    message: "Email is required",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            if (!password) {
                setAlert({
                    type: "error",
                    message: "Password is required",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            if (!confirmPassword) {
                setAlert({
                    type: "error",
                    message: "Confirm Password is required",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            if (!phone) {
                setAlert({
                    type: "error",
                    message: "Phone is required",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            if (!address) {
                setAlert({
                    type: "error",
                    message: "Address is required",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }

            if (password.length < 6) {
                setAlert({
                    type: "warning",
                    message: "passwordCheck",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            if (password !== confirmPassword) {
                setAlert({ type: "warning", message: "Confirm Password not match!" });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            try {
                delete registerForm.confirmPassword;
                const registerData = await registerUser({
                    ...registerForm,
                    roles: {
                        connect: {
                            id: 2,
                        },
                    },
                });

                if (!registerData) {
                    setAlert({ type: "error", message: registerData.message });
                    setTimeout(() => setAlert(null), 30000);
                } else {
                    navigate("/active-account");
                }
            } catch (error) {
                console.log(error);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            fullName,
            confirmPassword,
            navigate,
            password,
            registerForm,
            registerUser,
            isActive,
            gender,
        ],
    );

    return (
        <div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form
                            onSubmit={onSubmit}
                            className="login100-form validate-form"
                            style={{ padding: "32px ", paddingTop: "22px" }}
                        >
                            <span
                                style={{ letterSpacing: "5px" }}
                                className="login100-form-title p-b-43"
                            >
                                REGISTER
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
                                className="wrap-input100-register validate-input"
                                data-validate="Valid email is required: ex@abc.xyz"
                            >
                                <input
                                    className="input100"
                                    type="text"
                                    name="fullName"
                                    placeholder="FullName"
                                    value={fullName}
                                    onChange={onChangeRegisterForm}
                                />
                                <span className="focus-input100" />
                            </div>
                            <div
                                className="wrap-input100-register validate-input"
                                data-validate="Valid email is required: ex@abc.xyz"
                            >
                                <input
                                    className="input100"
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={onChangeRegisterForm}
                                />
                                <span className="focus-input100" />
                            </div>
                            <div
                                className="wrap-input100-register validate-input"
                                data-validate="Password is required"
                            >
                                <input
                                    className="input100"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={onChangeRegisterForm}
                                />
                                <span className="focus-input100" />
                            </div>
                            <div
                                className="wrap-input100-register validate-input"
                                data-validate="Password is required"
                            >
                                <input
                                    className="input100"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={onChangeRegisterForm}
                                />
                                <span className="focus-input100" />
                            </div>
                            <div
                                className="wrap-input100-register validate-input"
                                data-validate="Password is required"
                            >
                                <input
                                    className="input100"
                                    type="text"
                                    maxLength={10}
                                    name="phone"
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={onChangeRegisterForm}
                                />
                                <span className="focus-input100" />
                            </div>
                            <div
                                className="wrap-input100-register validate-input"
                                data-validate="Address is required"
                            >
                                <input
                                    className="input100"
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={address}
                                    onChange={onChangeRegisterForm}
                                />
                                <span className="focus-input100" />
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
                                    Have an account?<strong> Login</strong>
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
