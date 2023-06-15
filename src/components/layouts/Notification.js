import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import "../Views/User/assets/css/notification.css";
import axios from "axios";
import { apiURL } from "../../api";
import { AuthContext } from "../../contexts/AuthContext";

import "moment/locale/vi";
moment.locale("vi");

const Notification = () => {
    const {
        authState: { user, authLoading },
        loadUser,
    } = useContext(AuthContext);

    useEffect(
        () => async () => {
            await loadUser();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [authLoading],
    );
    const [isHidden, setIsHidden] = useState(true);
    const [listNoti, setListNoti] = useState();
    const onMouseInShowNotification = () => {
        setIsHidden(false);
    };
    const onMouseOutShowNotification = () => {
        setIsHidden(true);
    };

    const previewNotification = (val) => {
        Swal.fire({
            position: "middle",
            icon: "info",
            title: val.title,
            html: `<div style="white-space: pre-line;padding:0 5%;text-align:left">${val.description}</div>`,
            showConfirmButton: false,
            // timer: 3000,
        });
    };

    const getNotifications = async () => {
        const resNoti = await axios.post(`${apiURL}/notifications/search`, {
            orderBy: { updatedAt: "desc" },
        });
        const resUser = await axios.post(`${apiURL}/users/${user?.data?.id}`);

        if (resNoti?.data?.data?.items?.length && resUser?.data?.data) {
            setListNoti(
                resNoti?.data?.data?.items.filter((p) =>
                    moment(p.createdAt).isSameOrAfter(resUser.data?.data?.createdAt),
                ),
            );
        }
    };
    if (!listNoti) {
        getNotifications();
    }

    console.log(listNoti);
    return (
        <div>
            <div
                className="nav-item notification-ui show"
                style={{ cursor: "pointer" }}
                onMouseEnter={onMouseInShowNotification}
                onMouseLeave={onMouseOutShowNotification}
            >
                <a className="nav-link notification-ui_icon" role="button">
                    <i className="fa fa-bell"></i>
                </a>
                <div className="notification-ui_dd show" hidden={isHidden}>
                    <div className="notification-ui_dd-header">
                        <h3 className="text-center">
                            <i className="fa fa-bell"> </i> Thông Báo
                        </h3>
                    </div>
                    <div className="notification-ui_dd-content">
                        {listNoti?.length ? (
                            listNoti?.map((item) => {
                                return (
                                    <div
                                        className="notification-list notification-list--unread"
                                        onClick={(e) => previewNotification(item)}
                                    >
                                        <div className="notification-list_img">
                                            <img
                                                src="https://static.vecteezy.com/system/resources/previews/000/597/449/original/hand-care-logo-vector.jpg"
                                                alt="user"
                                            />
                                        </div>
                                        <div className="notification-list_detail">
                                            <p>
                                                <b>{item.title}</b>
                                            </p>
                                            <p style={{ whiteSpace: "pre-line" }}>
                                                {item.description.length > 100
                                                    ? item.description.substring(0, 100) + "..."
                                                    : item.description}
                                            </p>
                                            <p>
                                                <small>
                                                    {moment
                                                        .utc(item.createdAt)
                                                        .local()
                                                        .startOf("seconds")
                                                        .fromNow()}
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div
                                style={{
                                    textAlign: "center",
                                    margin: "20px 0px",
                                }}
                            >
                                Hiện không có thông báo nào!
                            </div>
                        )}
                    </div>
                    <div
                        className="notification-ui_dd-footer"
                        style={{ height: 15, background: "green" }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
