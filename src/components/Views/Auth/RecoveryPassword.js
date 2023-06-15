import { Link, useNavigate } from "react-router-dom";
import React, { useState, useCallback, useContext, lazy, Suspense, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Loading from "../../layouts/Loading";

import "./css/util.css";
import "./css/main.css";
import "../User/assets/css/profile.css";
import Swal from "sweetalert2";

const AlertMessage = lazy(() => import("../../../components/layouts/AlertMessage"));

const RecoveryPassword = () => {
    // Forgot Password From
    const navigate = useNavigate();

    const emailRecovery = localStorage.getItem("recoveryEmail");

    if (!emailRecovery) {
        window.location.href =
            process.env.NODE_ENV !== "production"
                ? "http://localhost:5000/login"
                : "https://scs-helpz.netlify.app/login";
    }

    const { resetPassword } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const [disableRecoveryPassword, setDisableRecoveryPassword] = useState(true);

    const [recoveryPasswordForm, setRecoveryPasswordForm] = useState({
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [alert, setAlert] = useState(null);
    const { otp, newPassword, confirmPassword } = recoveryPasswordForm;

    const onChangeRecoveryPasswordForm = useCallback(
        (event) => {
            setRecoveryPasswordForm({
                ...recoveryPasswordForm,
                [event.target.name]: event.target.value,
            });
        },
        [recoveryPasswordForm],
    );

    useEffect(() => {
        if (
            !recoveryPasswordForm.otp ||
            !recoveryPasswordForm.newPassword ||
            !recoveryPasswordForm.confirmPassword ||
            recoveryPasswordForm.newPassword?.length < 6 ||
            recoveryPasswordForm.confirmPassword?.length < 6
        ) {
            setDisableRecoveryPassword(true);
        } else {
            setDisableRecoveryPassword(false);
        }
    }, [recoveryPasswordForm]);

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setAlert({
                type: "error",
                message: "Mật khẩu không trùng khớp",
            });
            setTimeout(() => setAlert(null), 30000);
            return;
        }
        setIsLoading(true);

        try {
            const recoveryData = await resetPassword({
                otp: recoveryPasswordForm.otp,
                email: emailRecovery,
                newPassword: recoveryPasswordForm.newPassword,
            });

            if (recoveryData?.message === "data.MSG_WRONG_OTP") {
                setIsLoading(false);
                Swal.fire({
                    position: "top-center",
                    icon: "warning",
                    title: "Warning",
                    text: "Otp không chính xác!",
                    showConfirmButton: true,
                    timer: 3000,
                });
                return;
            }
            if (recoveryData?.data?.statusCode === 200) {
                localStorage.removeItem("recoveryEmail");
                setIsLoading(false);
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Thông Báo!",
                    text: "Khôi phục tài khoản thành công!",
                    showConfirmButton: true,
                    timer: 5000,
                }).finally(() => {
                    window.location.href =
                        process.env.NODE_ENV !== "production"
                            ? "http://localhost:5000/login"
                            : "https://scs-helpz.netlify.app/login";
                });
                setTimeout(() => {
                    window.location.href =
                        process.env.NODE_ENV !== "production"
                            ? "http://localhost:5000/login"
                            : "https://scs-helpz.netlify.app/login";
                }, 5000);
                return;
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
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
                                Khôi Phục Mật Khẩu
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
                                    placeholder="OTP"
                                    type="text"
                                    name="otp"
                                    onChange={onChangeRecoveryPasswordForm}
                                    value={otp}
                                />
                                <span className="focus-input100" />
                            </div>
                            <div
                                className="wrap-input100 validate-input"
                                data-validate="Valid email is required: ex@abc.xyz"
                            >
                                <input
                                    className="input100"
                                    placeholder="Mật khẩu mới"
                                    type="password"
                                    name="newPassword"
                                    onChange={onChangeRecoveryPasswordForm}
                                    value={newPassword}
                                />
                                <span className="focus-input100" />
                            </div>
                            <div
                                className="wrap-input100 validate-input"
                                data-validate="Password is required"
                            >
                                <input
                                    className="input100"
                                    name="confirmPassword"
                                    onChange={onChangeRecoveryPasswordForm}
                                    placeholder="Nhập lại mật khẩu"
                                    value={confirmPassword}
                                    type="password"
                                />

                                <span className="focus-input100" />
                            </div>

                            <div className="container-login100-form-btn">
                                <button
                                    className="login100-form-btn"
                                    type="submit"
                                    disabled={disableRecoveryPassword}
                                    style={{ marginTop: 20 }}
                                >
                                    Đổi mật khẩu
                                </button>
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

export default RecoveryPassword;
