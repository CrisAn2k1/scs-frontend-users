import React, { Suspense, lazy, useCallback, useContext, useState } from "react";

import "./css/util.css";
import "./css/main.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Loading from "../../layouts/Loading";
import Swal from "sweetalert2";

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
        isLoveKitchen: false,
    });

    const [alert, setAlert] = useState(null);
    const {
        fullName,
        email,
        password,
        confirmPassword,
        phone,
        address,
        isActive,
        gender,
        isLoveKitchen,
    } = registerForm;

    const onChangeRegisterForm = useCallback(
        (event) => {
            if (event.target.name == "isLoveKitchen") {
                event.target.value = event.target.value == "false" ? true : false;
            }

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

            if (!registerForm.fullName) {
                setAlert({
                    type: "error",
                    message: "Vui lòng nhập họ tên!",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            if (!registerForm.email) {
                setAlert({
                    type: "error",
                    message: "Vui lòng nhập email!",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            if (!registerForm.password) {
                setAlert({
                    type: "error",
                    message: "Vui lòng nhập mật khẩu!",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            if (!registerForm.confirmPassword) {
                setAlert({
                    type: "error",
                    message: "Vui lòng nhập lại mật khẩu!",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            if (!registerForm.phone) {
                setAlert({
                    type: "error",
                    message: "Vui lòng nhập số điện thoại!",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            if (!registerForm.address) {
                setAlert({
                    type: "error",
                    message: "Vui lòng nhập địa chỉ",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }

            if (password.length < 6) {
                setAlert({
                    type: "error",
                    message: "Mật khẩu phải ít nhất 6 ký tự!",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            if (password !== confirmPassword) {
                setAlert({ type: "error", message: "Mật khẩu không trùng khớp!" });
                setTimeout(() => setAlert(null), 30000);
                return;
            }

            try {
                let role = 2;
                if (registerForm.isLoveKitchen == "true") {
                    registerForm.isActive = false;
                    role = 3;
                } else {
                    registerForm.isActive = true;
                }

                const registerData = await registerUser({
                    ...registerForm,
                    isLoveKitchen: undefined,
                    confirmPassword: undefined,
                    roles: {
                        connect: {
                            id: role,
                        },
                    },
                });
                if (registerData) {
                    console.log(registerData);
                    if (registerData.message) {
                        setAlert({
                            type: "error",
                            message:
                                registerData.message[0].message === "data.MSG_DUPLICATE" &&
                                "Số điện thoại đẫ tồn tại!",
                        });
                        setTimeout(() => setAlert(null), 30000);
                        return;
                    }
                    localStorage.setItem("registerEmail", registerForm.email);
                    navigate("/active-account");
                }
            } catch (error) {
                //  setAlert({ type: "error", message: registerData.message });
                //     setTimeout(() => setAlert(null), 30000);
                console.log(error);
                return;
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
                            <div
                                data-validate="Love Kitchen"
                                style={{
                                    display: "flex",
                                    justifyContent: "left",
                                    alignItems: "center",
                                    margin: "10px 0 0 10px",

                                    fontSize: 17,
                                }}
                            >
                                <input
                                    name="isLoveKitchen"
                                    value={isLoveKitchen}
                                    style={{ cursor: "pointer", width: 15 }}
                                    id="isLoveKitchen"
                                    type="checkbox"
                                    onChange={onChangeRegisterForm}
                                />
                                <label
                                    className=""
                                    style={{
                                        cursor: "pointer",
                                        marginLeft: 10,
                                    }}
                                    htmlFor="isLoveKitchen"
                                >
                                    Đăng ký <strong>"Bếp Yêu Thương"</strong>
                                </label>
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
