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

    useEffect(() => {
        if (user?.data?.id) {
            getHistory();
        }
    }, [user]);

    const getHistory = async () => {
        const responseHistory = await axios.post(`${apiURL}/users/${user.data.id}`, {
            select: { schedules: { include: { leader: true } } },
        });
        setSchedulesHistory(responseHistory.data.data);
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
                            <h4 className="text-center" style={{ color: "#ff4100fa" }}>
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
                            }}
                        >
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
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <h6>Ngày bắt đầu:</h6>
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <h6>Ngày kết thúc:</h6>
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <h6>Đội trưởng:</h6>
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <h6>Trạng thái:</h6>
                                        </div>
                                    </div>
                                    <div className="col-7 info-donation">
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <h6>28/05/2023 8:27 AM</h6>
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <h6>28/05/2023 7:16 PM</h6>
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <h6>Lê Thành Nam</h6>
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <h6> Đã hoàn thành </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div
                            className="row"
                            style={{
                                borderRadius: 35,
                                borderStyle: "solid",
                                borderColor: "#10b6bb69",
                                marginBottom: 20,
                                minHeight: 255,
                                padding: 20,
                                width: "100%",
                                margin: "unset",
                            }}
                        >
                            <div className="col-3" style={{ paddingBottom: 50 }}>
                                <div style={{ marginTop: 15 }}>
                                    <label>Ngày kêu gọi</label>
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
                                <div style={{ marginTop: 15 }}>
                                    <label>Mô tả:</label>
                                </div>
                            </div>
                            <div className="col-9" style={{ paddingBottom: 50, color: "#44749c" }}>
                                <div style={{ marginTop: 15 }}>
                                    <label>11/05/2023</label>
                                </div>
                                <div style={{ marginTop: 15 }}>
                                    <label> 15.000.000 đ</label>
                                </div>
                                <div style={{ marginTop: 15 }}>
                                    <label>14.523.000 đ</label>
                                </div>
                                <div style={{ marginTop: 15 }}>
                                    <img
                                        src="https://lsvn.vn/storage/uploads/2020/03/UNG-HO-PHONG-COVID-NGAP-MAN1-1-741x1024.jpg"
                                        width={50}
                                    ></img>
                                    {"   "}
                                    <img
                                        src="https://img.vietnamfinance.vn/webp-jpg/upload/news/ngocthu/2020/11/24/126043225_10160398653207437_3949433270339317309_n.webp"
                                        width={50}
                                    ></img>
                                </div>
                                <div style={{ marginTop: 15 }}>
                                    <label>
                                        Hiện chúng tôi đang cần số tiền 15.000.000đ để cứu trợ người
                                        dân trong mùa dịch Covid-19. Rất mong được sự ủng hộ của các
                                        nhà hảo tâm!.
                                    </label>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SchedulesHistory;
