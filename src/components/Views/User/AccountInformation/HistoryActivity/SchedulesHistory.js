import React from "react";
import "../../../User/assets/css/profile.css";

import { AuthContext } from "../../../../../contexts/AuthContext";

import { lazy, Suspense, useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../../layouts/Loading";

import Swal from "sweetalert2";

import axios from "axios";
import { apiURL } from "../../../../../api";

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
            select: { schedules: { include: { leader: true } } },
        });
        setSchedulesHistory(responseHistory.data.data.schedules);
    };

    useEffect(() => {
        schedulesHistory ? setIsLoading(false) : setIsLoading(true);
    }, [schedulesHistory]);

    console.log(schedulesHistory);

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
                    <div
                        className="row"
                        style={{ padding: "30px 60px", display: "flex", justifyContent: "center" }}
                    >
                        <div className="col-12" style={{ padding: "20px 0" }}>
                            <h4
                                className="text-center"
                                style={{ color: "#ff4100fa", fontWeight: "bold" }}
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
                                                <div className="col-5">
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
                                                        style={{ marginTop: 15 }}
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
                                                            <h6>---------</h6>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="col-md-12"
                                                        style={{ marginTop: 15 }}
                                                    >
                                                        <h6>{item.leader.fullName}</h6>
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
