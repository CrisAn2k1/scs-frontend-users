import React, { useCallback, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../contexts/AuthContext";

const ChangePasswordForm = () => {
    // change password

    const { changePassword } = useContext(AuthContext);

    const [disableChangePass, setDisableChangePass] = useState(false);
    const [changePasswordForm, setChangePasswordForm] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    });
    const { password, newPassword, confirmPassword } = changePasswordForm;
    const onChangePasswordForm = useCallback(
        (event) => {
            setChangePasswordForm({
                ...changePasswordForm,
                [event.target.name]: event.target.value,
            });
        },
        [changePasswordForm],
    );
    useEffect(() => {
        if (password == "" || newPassword == "" || confirmPassword == "") {
            setDisableChangePass(true);
        } else {
            setDisableChangePass(false);
        }
    }, [changePasswordForm]);
    const onSubmitChangePass = useCallback(
        async (event) => {
            event.preventDefault();

            if (newPassword.length < 6) {
                Swal.fire({
                    position: "top-center",
                    icon: "warning",
                    title: "Warning",
                    text: "Mật khẩu phải ít nhất 6 ký tự!",
                    showConfirmButton: true,
                    timer: 2000,
                });
                return;
            }
            if (newPassword != confirmPassword) {
                Swal.fire({
                    position: "top-center",
                    icon: "warning",
                    title: "Warning",
                    text: "Mật khẩu không trùng khớp",
                    showConfirmButton: true,
                    timer: 2000,
                });
                return;
            }

            try {
                const changePassData = await changePassword({
                    password: changePasswordForm.password,
                    newPassword: changePasswordForm.newPassword,
                });

                if (changePassData.data) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Đổi Mật Khẩu",
                        text: "Đổi mật khẩu thành công !",
                        showConfirmButton: true,
                        timer: 3000,
                    }).then(() => {
                        window.location.reload(true);
                    });
                } else {
                    Swal.fire({
                        position: "top-center",
                        icon: "error",
                        title: "Đổi Mật Khẩu",
                        text: "Mật khẩu cũ không chính xác!",
                        showConfirmButton: true,
                        timer: 3000,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            password, //dispatch,
            newPassword,
            changePasswordForm,
        ],
    );
    // end change password
    return (
        <div style={{ marginTop: 10 }}>
            <>
                {/* Button trigger modal */}
                <a
                    style={{ fontSize: 16 }}
                    href="#"
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    id="tag-changePass"
                >
                    <i class="bi bi-key"></i>&ensp; Đổi mật khẩu
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
                    <div className="modal-dialog modal-dialog-centered" role="document">
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
                                                Đổi Mật Khẩu
                                            </h2>
                                            <div className="inputDiv">
                                                <label className="inputLabel" htmlFor="password">
                                                    Mật khẩu cũ
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    required=""
                                                    value={password}
                                                    onChange={onChangePasswordForm}
                                                />
                                            </div>
                                            <div className="inputDiv">
                                                <label className="inputLabel" htmlFor="newPassword">
                                                    Mật khẩu mới
                                                </label>
                                                <input
                                                    type="password"
                                                    id="newPassword"
                                                    name="newPassword"
                                                    required=""
                                                    value={newPassword}
                                                    onChange={onChangePasswordForm}
                                                />
                                            </div>
                                            <div className="inputDiv">
                                                <label
                                                    className="inputLabel"
                                                    htmlFor="confirmPassword"
                                                >
                                                    Nhập lại mật khẩu
                                                </label>
                                                <input
                                                    type="password"
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    value={confirmPassword}
                                                    onChange={onChangePasswordForm}
                                                />
                                            </div>
                                            <div className="buttonWrapper">
                                                <button
                                                    disabled={disableChangePass}
                                                    type="submit"
                                                    id="submitButton"
                                                    onClick={onSubmitChangePass}
                                                    className="btn btn-primary profile-button"
                                                    style={{ width: "70%" }}
                                                >
                                                    Xác Nhận
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
    );
};

export default ChangePasswordForm;
