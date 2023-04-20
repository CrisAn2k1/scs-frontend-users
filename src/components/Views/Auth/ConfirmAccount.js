import React, { Suspense, lazy, useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Loading from "../../layouts/Loading";
import { useNavigate } from "react-router-dom";

const AlertMessage = lazy(() => import("../../../components/layouts/AlertMessage"));

const ConfirmAccount = () => {
    const navigate = useNavigate();
    const {
        authState: { user },
    } = useContext(AuthContext);

    const { verifyUser } = useContext(AuthContext);
    const [activeForm, setActiveForm] = useState({
        otp: "",
    });

    console.log("check info user");
    console.log(user?.data.email);
    const [alert, setAlert] = useState(null);
    const { otp } = activeForm;
    const onChangeactiveForm = useCallback(
        (event) => {
            setActiveForm({ ...activeForm, [event.target.name]: event.target.value });
        },
        [activeForm],
    );

    const onSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            if (!otp) {
                setAlert({
                    type: "warning",
                    message: "Please enter your OTP",
                });
                setTimeout(() => setAlert(null), 30000);
                return;
            }
            if (process.env.NODE_ENV !== "production") {
                try {
                    const activeData = await verifyUser({ ...activeForm, email: user?.data.email });
                    console.log(activeData);
                    if (activeData) {
                        setAlert({ type: "info", message: "Active account success!" });
                        setTimeout(() => navigate("/login"), 2000);
                    } else {
                        setAlert({ type: "warning", message: "OTP is not correct" });
                        setTimeout(() => setAlert(null), 30000);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
        [otp, activeForm],
    );

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
                                Active Account
                            </span>
                            <Suspense fallback={<Loading />}>
                                <AlertMessage info={alert} />
                            </Suspense>

                            <div
                                className="wrap-input100 validate-input"
                                data-validate="Password is required"
                            >
                                <input
                                    className="input100"
                                    name="otp"
                                    onChange={onChangeactiveForm}
                                    placeholder="Otp"
                                    value={otp}
                                    type="text"
                                />

                                <span className="focus-input100" />
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" type="submit">
                                    Active
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

export default ConfirmAccount;
