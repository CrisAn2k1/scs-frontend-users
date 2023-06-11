import React from "react";
import "../../../User/assets/css/profile.css";

import { AuthContext } from "../../../../../contexts/AuthContext";

import { lazy, Suspense, useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../../layouts/Loading";
import { toast$, user$ } from "../../../../../redux/selectors";

import Swal from "sweetalert2";

import axios from "axios";
import { apiURL } from "../../../../../api";

const ConfirmationsHistory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationsHistory, setConfirmationsHistory] = useState();
    const navigate = useNavigate();

    const {
        authState: { user, isAuthenticated, authLoading },
        loadUser,
    } = useContext(AuthContext);

    useEffect(
        () => async () => {
            await loadUser();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [authLoading],
    );

    if (!authLoading && !isAuthenticated) {
        navigate(`/login`);
    }

    useEffect(() => {
        if (user?.data?.id) {
            getHistory();
        }
    }, [user]);

    const getHistory = async () => {
        const responseHistory = await axios.post(`${apiURL}/users/${user.data.id}`, {
            select: {
                confirmations: {
                    include: {
                        confirmationDetails: {
                            include: { material: { select: { unit: true, name: true } } },
                        },
                    },
                },
            },
        });
        setConfirmationsHistory(responseHistory.data.data.confirmations);
    };

    useEffect(() => {
        confirmationsHistory ? setIsLoading(false) : setIsLoading(true);
    }, [confirmationsHistory]);

    console.log(confirmationsHistory);
    return (
        <>
            <Loading hidden={!isLoading} />
            <div
                style={{
                    background:
                        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../img/page-header.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    paddingBottom: "40px",
                }}
                className="profile"
            >
                <div className="page-header" style={{ padding: "65px", background: "unset" }}>
                    <div className="container">
                        <div className="row"></div>
                    </div>
                </div>
                <div
                    className="container rounded bg-white mt-5 mb-5"
                    style={{ fontFamily: `"Comic Sans MS", "Poppins-Regular", "Arial", "Times"` }}
                >
                    <div className="row" style={{ padding: "30px 40px", background: "#e3e4e459" }}>
                        <div className="col-12">
                            <h4
                                className="text-center"
                                style={{ color: "#ff4100fa", fontWeight: "bold" }}
                            >
                                Lịch Sử Yêu Cầu Nhận Nguyên Liệu
                                <hr />
                            </h4>
                        </div>
                        <div
                            className="row"
                            style={{
                                maxHeight: 800,
                                overflowY: "scroll",
                                width: "100%",
                                display: "flex",
                                justifyContent: "left",
                            }}
                        >
                            {confirmationsHistory?.length ? (
                                confirmationsHistory?.map((item) => {
                                    return (
                                        <div className="col-md-6" style={{ padding: 0 }}>
                                            <div
                                                className="row mt-3"
                                                style={{
                                                    border: "2px dashed #10b6bb69",
                                                    borderRadius: 15,
                                                    padding: "15px 0 30px 0",
                                                    margin: 10,
                                                    minHeight: 255,
                                                }}
                                            >
                                                <div className="col-4" style={{ paddingRight: 0 }}>
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        <h6>Ngày Tạo:</h6>
                                                    </div>
                                                    <div
                                                        className="col-md-12"
                                                        style={{
                                                            marginTop: 15,
                                                            height: 100,
                                                            marginBottom: 20,
                                                        }}
                                                    >
                                                        <h6>Nguyên liệu: </h6>
                                                    </div>

                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        <h6>Trạng thái duyệt: </h6>
                                                    </div>

                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        <h6>Trạng thái nhận: </h6>
                                                    </div>
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        <h6>Mô tả:</h6>
                                                    </div>
                                                </div>

                                                <div
                                                    className="col-8 info-donation"
                                                    style={{ paddingLeft: 0 }}
                                                >
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        <h6>
                                                            {new Intl.DateTimeFormat("en-US", {
                                                                hour12: true,
                                                                hour: "numeric",
                                                                minute: "numeric",
                                                                year: "numeric",
                                                                month: "2-digit",
                                                                day: "2-digit",
                                                            })
                                                                .format(new Date(item.createdAt))
                                                                .replace(",", "")}
                                                        </h6>
                                                    </div>
                                                    <div
                                                        className="col-md-12"
                                                        style={{
                                                            marginTop: 15,
                                                            height: 100,
                                                            overflowY: "scroll",
                                                            marginBottom: 20,
                                                        }}
                                                    >
                                                        {item.confirmationDetails.length &&
                                                            item.confirmationDetails.map(
                                                                (detail) => {
                                                                    return (
                                                                        <h6
                                                                            style={{
                                                                                marginBottom: 10,
                                                                            }}
                                                                        >
                                                                            {detail.material.name} -{" "}
                                                                            {detail.quantity}{" "}
                                                                            {detail.material.unit}{" "}
                                                                        </h6>
                                                                    );
                                                                },
                                                            )}
                                                    </div>

                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        {item.status === "approved" ? (
                                                            <h6 style={{ color: "limegreen" }}>
                                                                Đã Duyệt
                                                            </h6>
                                                        ) : item.status === "declined " ? (
                                                            <h6 style={{ color: "red" }}>
                                                                Từ chối
                                                            </h6>
                                                        ) : (
                                                            <h6 style={{ color: "orange" }}>
                                                                Chờ xử lý
                                                            </h6>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        {item.deliveryStatus === "success" ? (
                                                            <h6 style={{ color: "limegreen" }}>
                                                                Đã Nhận
                                                            </h6>
                                                        ) : (
                                                            <h6 style={{ color: "orange" }}>
                                                                Chưa Nhận
                                                            </h6>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        <h6
                                                            style={{
                                                                height: 100,
                                                                overflow: "scroll",
                                                            }}
                                                        >
                                                            {item.description}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div
                                    style={{
                                        textAlign: "center",
                                        width: "100%",
                                        marginTop: "20px",
                                    }}
                                >
                                    Bạn không có lịch sử yêu cầu nhận nguyên liệu nào!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationsHistory;
