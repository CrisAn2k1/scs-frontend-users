import React from "react";
import "../../../User/assets/css/profile.css";

import { AuthContext } from "../../../../../contexts/AuthContext";

import { lazy, Suspense, useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../../layouts/Loading";
import { toast$, user$ } from "../../../../../redux/selectors";

import Swal from "sweetalert2";

import axios from "axios";
import { apiURL } from "../../../../../api";

const DonationsHistory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [donationsHistory, setDonationsHistory] = useState();
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

    const previewImage = (event) => {
        Swal.fire({
            imageUrl: event.target.src,
            imageAlt: "Custom image",
            showConfirmButton: false,
        });
    };

    const getHistory = async () => {
        const responseHistory = await axios.post(`${apiURL}/users/${user.data.id}`, {
            select: {
                moneyDonations: {
                    include: { event: { include: { charityCall: { include: { user: true } } } } },
                    orderBy: { createdAt: "desc" },
                },
                materialDonations: {
                    include: {
                        materialDonationDetails: {
                            include: { material: { select: { unit: true, name: true } } },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                },
            },
        });
        setDonationsHistory(responseHistory.data.data);
    };

    useEffect(() => {
        donationsHistory ? setIsLoading(false) : setIsLoading(true);
    }, [donationsHistory]);

    console.log(donationsHistory);
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
                    style={{
                        fontFamily: `Muli, sans-serif, "Comic Sans MS", Poppins-Regular, Arial, Times`,
                    }}
                >
                    <div className="row" style={{ background: "#e3e4e459" }}>
                        <div className="col-md-6 border-right">
                            <div className="py-5" style={{ paddingLeft: 15 }}>
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <h4
                                        className="text-center"
                                        style={{
                                            color: "#ff4100fa",
                                            fontWeight: "bold",
                                            fontFamily: `"Comic Sans MS", Poppins-Regular, Arial, Times`,
                                        }}
                                    >
                                        Lịch Sử Quyên Góp Tiền
                                        <hr />
                                    </h4>
                                </div>
                                <div
                                    style={{
                                        maxHeight: 800,
                                        overflowY: "scroll",
                                        padding: "0 20px",
                                        width: "100%",
                                    }}
                                >
                                    {donationsHistory?.moneyDonations?.length ? (
                                        donationsHistory.moneyDonations.map((item) => {
                                            console.log(item);
                                            return (
                                                <>
                                                    <div
                                                        className="row mt-3"
                                                        style={{
                                                            border: "2px dashed #10b6bb69",
                                                            borderRadius: 15,
                                                            padding: "15px 0 30px 0",
                                                            marginBottom: 20,
                                                            background: "#ffffff",
                                                        }}
                                                    >
                                                        <div className="col-5 donate-info-text">
                                                            <div
                                                                className="col-md-12"
                                                                style={{
                                                                    marginTop: 15,
                                                                }}
                                                            >
                                                                <h6
                                                                    style={{
                                                                        width: "max-content",
                                                                    }}
                                                                >
                                                                    Ngày quyên góp:
                                                                </h6>
                                                            </div>
                                                            <div
                                                                className="col-md-12"
                                                                style={{ marginTop: 15 }}
                                                            >
                                                                <h6>Sự kiện:</h6>
                                                            </div>
                                                            <div
                                                                className="col-md-12"
                                                                style={{ marginTop: 15 }}
                                                            >
                                                                <h6
                                                                    style={{ width: "max-content" }}
                                                                >
                                                                    Thời gian kêu gọi:
                                                                </h6>
                                                            </div>
                                                            <div
                                                                className="col-md-12"
                                                                style={{ marginTop: 15 }}
                                                            >
                                                                <h6>Người kêu gọi:</h6>
                                                            </div>
                                                            <div
                                                                className="col-md-12"
                                                                style={{ marginTop: 15 }}
                                                            >
                                                                <h6>Địa chỉ:</h6>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 info-donation">
                                                            <div
                                                                className="col-md-12"
                                                                style={{ marginTop: 15 }}
                                                            >
                                                                <h6>
                                                                    {new Intl.DateTimeFormat(
                                                                        ["ban", "id"],
                                                                        {
                                                                            year: "numeric",
                                                                            month: "2-digit",
                                                                            day: "2-digit",

                                                                            hour12: true,
                                                                            hour: "numeric",
                                                                            minute: "numeric",
                                                                        },
                                                                    )
                                                                        .format(
                                                                            new Date(
                                                                                item.createdAt,
                                                                            ),
                                                                        )
                                                                        .replace(".", ":")}
                                                                </h6>
                                                            </div>
                                                            <div
                                                                className="col-md-12"
                                                                style={{ marginTop: 15 }}
                                                            >
                                                                <h6>
                                                                    <Link
                                                                        className="donations-history-event"
                                                                        to={`/events/${item.event.id}`}
                                                                    >
                                                                        {item.event.title.length >
                                                                        20
                                                                            ? item.event.title.substring(
                                                                                  0,
                                                                                  20,
                                                                              ) + "..."
                                                                            : item.event.title}
                                                                    </Link>
                                                                </h6>
                                                            </div>
                                                            <div
                                                                className="col-md-12"
                                                                style={{ marginTop: 15 }}
                                                            >
                                                                <h6 style={{ fontSize: 15 }}>
                                                                    {new Intl.DateTimeFormat(
                                                                        ["ban", "id"],
                                                                        {
                                                                            year: "numeric",
                                                                            month: "2-digit",
                                                                            day: "2-digit",
                                                                        },
                                                                    ).format(
                                                                        new Date(
                                                                            item.event.createdAt,
                                                                        ),
                                                                    )}
                                                                    {" ~ "}
                                                                    {new Intl.DateTimeFormat(
                                                                        ["ban", "id"],
                                                                        {
                                                                            year: "numeric",
                                                                            month: "2-digit",
                                                                            day: "2-digit",
                                                                        },
                                                                    ).format(
                                                                        new Date(
                                                                            item.event.expiredAt,
                                                                        ),
                                                                    )}
                                                                </h6>
                                                            </div>
                                                            <div
                                                                className="col-md-12"
                                                                style={{ marginTop: 15 }}
                                                            >
                                                                <h6>
                                                                    {
                                                                        item.event.charityCall.user
                                                                            .fullName
                                                                    }
                                                                </h6>
                                                            </div>
                                                            <div
                                                                className="col-md-12"
                                                                style={{ marginTop: 15 }}
                                                            >
                                                                <h6>
                                                                    {
                                                                        item.event.charityCall.user
                                                                            .address
                                                                    }
                                                                </h6>
                                                            </div>
                                                        </div>
                                                        <hr style={{ width: "100%" }}></hr>
                                                        <div className="col-5 donate-info-text">
                                                            <div
                                                                className="col-md-12"
                                                                style={{ marginTop: 15 }}
                                                            >
                                                                <h6
                                                                    style={{ width: "max-content" }}
                                                                >
                                                                    Số tiền quyên góp:
                                                                </h6>
                                                            </div>
                                                            <div
                                                                className="col-md-12"
                                                                style={{ marginTop: 15 }}
                                                            >
                                                                <h6
                                                                    style={{ width: "max-content" }}
                                                                >
                                                                    Chế độ quyên góp:
                                                                </h6>
                                                            </div>
                                                        </div>
                                                        <div className="col-7 info-donation">
                                                            <div
                                                                className="col-md-12"
                                                                style={{ marginTop: 15 }}
                                                            >
                                                                <h6 style={{ color: "red" }}>
                                                                    {new Intl.NumberFormat(
                                                                        "vi-VN",
                                                                        {
                                                                            style: "currency",
                                                                            currency: "VND",
                                                                        },
                                                                    ).format(item.amount || 500000)}
                                                                </h6>
                                                            </div>
                                                            <div
                                                                className="col-md-12"
                                                                style={{ marginTop: 15 }}
                                                            >
                                                                {item.isAnonymous ? (
                                                                    <h6 style={{ color: "red" }}>
                                                                        Ẩn danh
                                                                    </h6>
                                                                ) : (
                                                                    <h6
                                                                        style={{
                                                                            color: "limegreen",
                                                                        }}
                                                                    >
                                                                        Công Khai
                                                                    </h6>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
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
                                            Bạn không có lịch sử quyên góp tiền nào!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 border-right">
                            <div className="py-5">
                                <div className="d-flex justify-content-center align-items-center mb-3">
                                    <h4
                                        className="text-center"
                                        style={{
                                            color: "#ff4100fa",
                                            fontWeight: "bold",
                                            fontFamily: `"Comic Sans MS", Poppins-Regular, Arial, Times`,
                                        }}
                                    >
                                        Lịch Sử Quyên Góp Nguyên Liệu
                                        <hr />
                                    </h4>
                                </div>
                                <div
                                    style={{
                                        maxHeight: 800,
                                        overflowY: "scroll",
                                        padding: "0 20px",
                                        width: "100%",
                                    }}
                                >
                                    {donationsHistory?.materialDonations?.length ? (
                                        donationsHistory?.materialDonations?.map((item) => {
                                            return (
                                                <div
                                                    className="row mt-3"
                                                    style={{
                                                        border: "2px dashed #10b6bb69",
                                                        borderRadius: 15,
                                                        padding: "15px 0 30px 0",
                                                        marginBottom: 20,
                                                        background: "#ffffff",
                                                        marginTop: "0 !important",
                                                    }}
                                                >
                                                    <div className="col-5 donate-info-text">
                                                        <div
                                                            className="col-md-12"
                                                            style={{ marginTop: 15 }}
                                                        >
                                                            <h6 style={{ width: "max-content" }}>
                                                                Ngày quyên góp:
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="col-md-12"
                                                            style={{ marginTop: 15, height: 100 }}
                                                        >
                                                            <h6>Mô tả:</h6>
                                                        </div>
                                                        <div
                                                            className="col-md-12"
                                                            style={{ marginTop: 15, height: 140 }}
                                                        >
                                                            <h6 style={{ width: "max-content" }}>
                                                                Hình ảnh minh chứng
                                                            </h6>
                                                        </div>

                                                        <div
                                                            className="col-md-12"
                                                            style={{ marginTop: 15 }}
                                                        >
                                                            <h6>Nguyên liệu: </h6>
                                                        </div>
                                                    </div>

                                                    <div className="col-7 info-donation">
                                                        <div
                                                            className="col-md-12"
                                                            style={{ marginTop: 15 }}
                                                        >
                                                            <h6>
                                                                {new Intl.DateTimeFormat(
                                                                    ["ban", "id"],
                                                                    {
                                                                        year: "numeric",
                                                                        month: "2-digit",
                                                                        day: "2-digit",

                                                                        hour12: true,
                                                                        hour: "numeric",
                                                                        minute: "numeric",
                                                                    },
                                                                )
                                                                    .format(
                                                                        new Date(item.createdAt),
                                                                    )
                                                                    .replace(".", ":")}
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="col-md-12"
                                                            style={{
                                                                marginTop: 15,
                                                                height: 100,
                                                                overflowY: "scroll",
                                                            }}
                                                        >
                                                            <h6>Rất vui khi được quyên góp!</h6>
                                                        </div>
                                                        <div
                                                            className="col-md-12"
                                                            style={{
                                                                marginTop: 15,
                                                                height: 140,
                                                            }}
                                                        >
                                                            {item.images.map((image) => {
                                                                return (
                                                                    <img
                                                                        className="img-history"
                                                                        style={{
                                                                            objectFit: "cover",
                                                                            margin: "0 10px 10px 0",
                                                                            cursor: "pointer",
                                                                        }}
                                                                        src={image.url}
                                                                        width={60}
                                                                        height={60}
                                                                        onClick={(e) =>
                                                                            previewImage(e)
                                                                        }
                                                                    ></img>
                                                                );
                                                            })}
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
                                                            {/* {item.confirmationDetails.length &&
                                                                item.confirmationDetails.map(
                                                                    (detail) => {
                                                                        return (
                                                                            <h6
                                                                                style={{
                                                                                    marginBottom: 10,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    detail.material
                                                                                        .name
                                                                                }{" "}
                                                                                - {detail.quantity}{" "}
                                                                                {
                                                                                    detail.material
                                                                                        .unit
                                                                                }{" "}
                                                                            </h6>
                                                                        );
                                                                    },
                                                                )} */}
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
                                            Bạn không có lịch sử quyên góp nguyên liệu nào!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DonationsHistory;
