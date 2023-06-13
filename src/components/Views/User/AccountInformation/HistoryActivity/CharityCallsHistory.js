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

const CharityCallsHistory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [charityCallsHistory, setCharityCallsHistory] = useState();
    const navigate = useNavigate();

    const {
        authState: { user, isAuthenticated, authLoading },
        loadUser,
    } = useContext(AuthContext);

    const previewImage = (event) => {
        Swal.fire({
            imageUrl: event.target.src,
            imageAlt: "Custom image",
            showConfirmButton: false,
        });
    };

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
                charityCalls: {
                    include: { event: true },
                },
            },
        });
        setCharityCallsHistory(responseHistory.data.data.charityCalls);
    };

    useEffect(() => {
        charityCallsHistory ? setIsLoading(false) : setIsLoading(true);
    }, [charityCallsHistory]);

    return (
        <>
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
                    <div className="row" style={{ padding: "30px 60px" }}>
                        <div className="col-12" style={{ padding: "20px 0" }}>
                            <h4
                                className="text-center"
                                style={{ color: "#ff4100fa", fontWeight: "bold" }}
                            >
                                Lịch Sử Kêu Gọi Từ Thiện
                                <hr />
                            </h4>
                        </div>
                        <div
                            style={{
                                maxHeight: 800,
                                overflowY: "scroll",
                                padding: "0px 20px",
                                width: "100%",
                            }}
                        >
                            {charityCallsHistory?.length ? (
                                charityCallsHistory.map((item) => {
                                    return (
                                        <div
                                            className="row"
                                            style={{
                                                border: "2px dashed #10b6bb69",
                                                borderRadius: 15,
                                                marginBottom: 10,
                                                minHeight: 255,
                                                padding: 20,
                                                width: "100%",
                                            }}
                                        >
                                            <div className="col-3" style={{ paddingBottom: 50 }}>
                                                <div style={{ marginTop: 15 }}>
                                                    <label>Ngày yêu cầu:</label>
                                                </div>
                                                <div style={{ marginTop: 15 }}>
                                                    <label>Trạng thái xét duyệt</label>
                                                </div>
                                                <div style={{ marginTop: 15 }}>
                                                    <label>Thời gian kêu gọi::</label>
                                                </div>
                                                <div style={{ marginTop: 15 }}>
                                                    <label>Số tiền kêu gọi:</label>
                                                </div>
                                                <div style={{ marginTop: 15 }}>
                                                    <label>Số tiền nhận được:</label>
                                                </div>
                                                <div style={{ marginTop: 15 }}>
                                                    <label>Minh chứng:</label>
                                                </div>
                                                <br />
                                                <br />
                                            </div>
                                            <div
                                                className="col-9"
                                                style={{
                                                    paddingBottom: 50,
                                                    color: "#d32626",
                                                    fontWeight: 550,
                                                }}
                                            >
                                                <div style={{ marginTop: 15 }}>
                                                    <label>
                                                        {new Intl.DateTimeFormat(["ban", "id"], {
                                                            year: "numeric",
                                                            month: "2-digit",
                                                            day: "2-digit",

                                                            hour12: true,
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                        })
                                                            .format(new Date(item.createdAt))
                                                            .replace(".", ":")}
                                                    </label>
                                                </div>
                                                <div style={{ marginTop: 15 }}>
                                                    <label>
                                                        {item.status === "approved" ? (
                                                            <label style={{ color: "limegreen" }}>
                                                                Đã Duyệt
                                                            </label>
                                                        ) : item.status === "declined " ? (
                                                            <label style={{ color: "red" }}>
                                                                Từ chối
                                                            </label>
                                                        ) : (
                                                            <label style={{ color: "orange" }}>
                                                                Chờ xử lý
                                                            </label>
                                                        )}
                                                    </label>
                                                </div>
                                                <div style={{ marginTop: 15 }}>
                                                    <label>
                                                        {item.event && item.status === "approved"
                                                            ? new Intl.DateTimeFormat("vi-VN", {
                                                                  year: "numeric",
                                                                  month: "2-digit",
                                                                  day: "2-digit",
                                                              }).format(
                                                                  new Date(item.event.createdAt),
                                                              ) +
                                                              " ~ " +
                                                              new Intl.DateTimeFormat("vi-VN", {
                                                                  year: "numeric",
                                                                  month: "2-digit",
                                                                  day: "2-digit",
                                                              }).format(
                                                                  new Date(item.event.expiredAt),
                                                              )
                                                            : "Chưa có"}
                                                    </label>
                                                </div>
                                                <div style={{ marginTop: 15 }}>
                                                    <label>
                                                        {new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(item.amountLimit)}
                                                    </label>
                                                </div>
                                                <div style={{ marginTop: 15 }}>
                                                    <label>14.523.000 đ</label>
                                                </div>
                                                <div style={{ marginTop: 15 }}>
                                                    {item.proofs.map((image) => {
                                                        return (
                                                            <img
                                                                style={{
                                                                    objectFit: "cover",
                                                                    marginLeft: "10px",
                                                                    cursor: "pointer",
                                                                }}
                                                                src={image.url}
                                                                width={80}
                                                                height={80}
                                                                onClick={(e) => previewImage(e)}
                                                            ></img>
                                                        );
                                                    })}
                                                </div>
                                                <div style={{ marginTop: 15 }}></div>
                                            </div>
                                            <hr style={{ width: "100%" }} />
                                            <div className="col-12">
                                                <div
                                                    className="row"
                                                    style={{ marginBottom: 15, width: "100%" }}
                                                >
                                                    <div className="col-3">
                                                        <label>Mô tả lời kêu gọi:</label>
                                                    </div>
                                                    <div className="col-9">
                                                        <label>{item.description}</label>
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
                                    Bạn không có lịch sử kêu gọi quyên góp nào!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CharityCallsHistory;
