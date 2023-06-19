import React from "react";
import "../../../User/assets/css/profile.css";

import { AuthContext } from "../../../../../contexts/AuthContext";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../layouts/Loading";

import axios from "axios";
import { apiURL } from "../../../../../api";
import Swal from "sweetalert2";

const SchedulesHistory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [schedulesHistory, setSchedulesHistory] = useState();
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
                schedules: {
                    include: {
                        leader: true,
                        users: true,
                        scheduleDetails: {
                            include: { materialDonation: { select: { address: true } } },
                            orderBy: { createdAt: "desc" },
                        },
                    },
                },
                leadSchedules: {
                    include: {
                        leader: true,
                        users: true,
                        scheduleDetails: {
                            include: { materialDonation: { select: { address: true } } },
                            orderBy: { createdAt: "desc" },
                        },
                    },
                },
            },
        });
        setSchedulesHistory(
            responseHistory.data.data.schedules.concat(
                responseHistory.data.data.leadSchedules.filter((el) => {
                    return !responseHistory.data.data.schedules.find((obj) => {
                        return el.id === obj.id;
                    });
                }),
            ),
        );
    };

    useEffect(() => {
        schedulesHistory ? setIsLoading(false) : setIsLoading(true);
    }, [schedulesHistory]);

    const showListVolunteer = (leader, members) => {
        Swal.fire({
            // icon: "info",
            title: "Danh Sách Người Đến Nhận",
            html: ` <div style="text-align: left;">
                    <div style="margin:10px 0;">
                        <strong>Trưởng nhóm:   <leader style="color:red">${
                            leader.id === user?.data?.id
                                ? leader.fullName + " (Tôi)"
                                : leader.fullName
                        }</leader> </strong>
                    </div>
                    <div>
                        <strong>Thành Viên:</strong>
                        <div style="text-indent: 30px;">
                            ${members.map((item) => {
                                return ` <div style="margin:10px 0;">
                                                <img
                                                    style="border-radius:50%"
                                                    src=${item.avatar?.url || "/img/logo.png"}
                                                    width=50
                                                    height=50
                                                ></img> 
                                                ${
                                                    item.id === user?.data?.id
                                                        ? `<strong> ${item.fullName} (Tôi)</strong>`
                                                        : item.fullName
                                                }
                                            </div>`;
                            })}
                        </div>
                    </div>
                </div>`,
        });
    };

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
                    <div
                        className="row"
                        style={{ padding: "30px 60px", display: "flex", justifyContent: "center" }}
                    >
                        <div className="col-12" style={{ padding: "20px 0" }}>
                            <h4
                                className="text-center"
                                style={{
                                    color: "#ff4100fa",
                                    fontWeight: "bold",
                                    fontFamily: `"Comic Sans MS", Poppins-Regular, Arial, Times`,
                                }}
                            >
                                Lịch Sử Tham Gia Lịch Trình Nhận Nguyên Liệu
                                <hr />
                            </h4>
                        </div>
                        <div
                            className="row"
                            style={{
                                textAlign: "left",
                                width: "100%",
                                marginTop: "20px",
                                maxHeight: 600,
                                overflowY: "scroll",
                            }}
                        >
                            {schedulesHistory?.length ? (
                                schedulesHistory.map((item) => {
                                    return (
                                        <div className="col-6" style={{ padding: 0 }}>
                                            <div
                                                className="row"
                                                style={{
                                                    border: "2px dashed #10b6bb69",
                                                    borderRadius: 15,
                                                    padding: "15px 0 30px 0",
                                                    margin: "0 10px",
                                                    marginBottom: "20px",
                                                }}
                                            >
                                                <div className="col-5 donate-info-text">
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        <h6>Ngày bắt đầu:</h6>
                                                    </div>
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        <h6>Ngày kết thúc:</h6>
                                                    </div>
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15, height: 40 }}
                                                    >
                                                        <h6>Đội trưởng:</h6>
                                                    </div>
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        <h6>Trạng thái:</h6>
                                                    </div>
                                                </div>
                                                <div className="col-7 info-donation">
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        <h6>
                                                            {new Intl.DateTimeFormat("en-US", {
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
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        {item.completedAt ? (
                                                            <h6>
                                                                {new Intl.DateTimeFormat("en-US", {
                                                                    year: "numeric",
                                                                    month: "2-digit",
                                                                    day: "2-digit",
                                                                })
                                                                    .format(
                                                                        new Date(item.createdAt),
                                                                    )
                                                                    .replace(",", "")}
                                                            </h6>
                                                        ) : (
                                                            <h6>---------------</h6>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        <h6
                                                            className="title-event"
                                                            onClick={() =>
                                                                showListVolunteer(
                                                                    item.leader,
                                                                    item.users,
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                style={{
                                                                    borderRadius: "50%",
                                                                    width: 40,
                                                                    height: 40,
                                                                }}
                                                                src={
                                                                    item.leader.avatar?.url ||
                                                                    "/img/logo.png"
                                                                }
                                                            />{" "}
                                                            {item.leader.fullName}
                                                        </h6>
                                                    </div>
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        {item.completedAt ? (
                                                            <h6 style={{ color: "limegreen" }}>
                                                                Đã hoàn thành
                                                            </h6>
                                                        ) : (
                                                            <h6 style={{ color: "orange" }}>
                                                                Chưa hoàn thành
                                                            </h6>
                                                        )}
                                                    </div>
                                                </div>
                                                <hr style={{ width: "100%" }}></hr>
                                                <div className="col-3 donate-info-text">
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15, height: 100 }}
                                                    >
                                                        <h6>Mô tả:</h6>
                                                    </div>
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15, height: 100 }}
                                                    >
                                                        <h6 style={{ width: "max-content" }}>
                                                            Địa điểm:
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div className="col-9 info-donation">
                                                    <div
                                                        className="col-md-12"
                                                        style={{
                                                            marginTop: 15,
                                                            height: 100,
                                                            overflowY: "scroll",
                                                        }}
                                                    >
                                                        <h6>{item.description}</h6>
                                                    </div>
                                                    <div
                                                        className="col-md-12"
                                                        style={{
                                                            marginTop: 15,
                                                            maxHeight: 100,
                                                            overflowY: "scroll",
                                                        }}
                                                    >
                                                        <h6>
                                                            {item.scheduleDetails?.length ? (
                                                                item.scheduleDetails?.map(
                                                                    (detail, index) => {
                                                                        return (
                                                                            <>
                                                                                -{" "}
                                                                                {
                                                                                    detail
                                                                                        .materialDonation
                                                                                        .address
                                                                                }
                                                                                <br />
                                                                            </>
                                                                        );
                                                                    },
                                                                )
                                                            ) : (
                                                                <label style={{ color: "orange" }}>
                                                                    Hiện chưa có địa điểm nào
                                                                </label>
                                                            )}
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
                                        marginBottom: "20px",
                                    }}
                                >
                                    Bạn không có lịch sử tham gia lịch trình nào!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SchedulesHistory;
