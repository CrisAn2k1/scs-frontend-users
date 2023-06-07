import React, { useEffect, useState } from "react";

import EventDetail from "../events/EventDetail";
import { Link } from "react-router-dom";
import { events$ } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/actions/events";
import Loading from "../layouts/Loading";

const Event = () => {
    const events = useSelector(events$);
    const dispatch = useDispatch();

    useEffect(() => {
        if (events?.data?.length === 0) {
            dispatch(getEvents.getEventsRequest());
        }
    }, []);

    let dateNow = new Date(
        new Date().getFullYear() +
            "-0" +
            String(new Date().getMonth() + 1) +
            "-" +
            new Date().getDate(),
    ).getTime();

    const eventsNotExpired = events?.data?.items?.filter(
        (p) => new Date(p.expiredAt.substring(0, 10)).getTime() >= dateNow,
    );
    const eventsExpired = events?.data?.items?.filter(
        (p) => new Date(p.expiredAt.substring(0, 10)).getTime() < dateNow,
    );

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        events?.data?.items ? setIsLoading(false) : setIsLoading(true);
    }, [events]);

    console.log(events);

    return (
        <>
            <Loading hidden={!isLoading} />
            {/* Page Header Start */}
            <div className="page-header" style={{ padding: "150px 0px 20px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Các Lời Kêu Gọi</h2>
                        </div>
                        <div className="col-12">
                            <a>Give Is Receive</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Header End */}
            {/* Event Start */}
            <div className="event">
                <div className="container" style={{ maxWidth: "90vw" }}>
                    <div className="section-header text-center">
                        <h2>Các cuộc kêu gọi hiện tại</h2>
                    </div>
                    <div className="row">
                        {eventsNotExpired?.length &&
                            eventsNotExpired.map((item) => {
                                return (
                                    <div className="col-lg-4">
                                        <div className="event-item">
                                            <img
                                                src={item.thumbnail.url || "img/event-1.jpg"}
                                                alt="Image"
                                            />
                                            <div className="event-content">
                                                <div>
                                                    <div className="event-text">
                                                        <h3>
                                                            {item.title.length > 35
                                                                ? item.title.substring(0, 35) +
                                                                  "..."
                                                                : item.title}
                                                        </h3>
                                                        <h4
                                                            style={{
                                                                fontSize: 15,
                                                                margin: "30px 0 10px 0",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            Từ:{" "}
                                                            {Intl.DateTimeFormat("en-US", {
                                                                year: "numeric",
                                                                month: "2-digit",
                                                                day: "2-digit",
                                                            }).format(
                                                                new Date(item.createdAt),
                                                            )}{" "}
                                                            {" ~ "}
                                                            {Intl.DateTimeFormat("en-US", {
                                                                year: "numeric",
                                                                month: "2-digit",
                                                                day: "2-digit",
                                                            }).format(new Date(item.expiredAt))}
                                                        </h4>
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <p>Người kêu gọi: </p>
                                                                <p>Địa chỉ: </p>
                                                                <p>Hiện tại: </p>
                                                                <p> Mục tiêu: </p>
                                                            </div>
                                                            <div className="col-8">
                                                                <p>
                                                                    <strong
                                                                        style={{ color: "red" }}
                                                                    >
                                                                        {
                                                                            item.charityCall.user
                                                                                .fullName
                                                                        }
                                                                    </strong>
                                                                </p>
                                                                <p>
                                                                    <strong
                                                                        style={{ color: "red" }}
                                                                    >
                                                                        {
                                                                            item.charityCall.user
                                                                                .address
                                                                        }
                                                                    </strong>
                                                                </p>
                                                                <p>
                                                                    <strong
                                                                        style={{ color: "red" }}
                                                                    >
                                                                        {new Intl.NumberFormat(
                                                                            "vi-VN",
                                                                            {
                                                                                style: "currency",
                                                                                currency: "VND",
                                                                            },
                                                                        ).format(
                                                                            item.amount || 1000000,
                                                                        )}
                                                                    </strong>
                                                                </p>
                                                                <p>
                                                                    <strong
                                                                        style={{ color: "red" }}
                                                                    >
                                                                        {new Intl.NumberFormat(
                                                                            "vi-VN",
                                                                            {
                                                                                style: "currency",
                                                                                currency: "VND",
                                                                            },
                                                                        ).format(
                                                                            item.charityCall
                                                                                .amountLimit ||
                                                                                1000000,
                                                                        )}
                                                                    </strong>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <hr />
                                                    <p className="p-description">
                                                        {item.description.length > 150
                                                            ? item.description.substring(0, 150) +
                                                              "..."
                                                            : item.description}
                                                    </p>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-around",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Link
                                                            className="btn btn-custom"
                                                            to={`/events/${item.id}`}
                                                            // style={{ padding: 10 }}
                                                        >
                                                            Chi Tiết
                                                        </Link>
                                                        <Link
                                                            className="btn btn-custom"
                                                            to={`/money-donation/${item.id}`}
                                                            // style={{ padding: 10 }}
                                                        >
                                                            Quyên Góp
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="section-header text-center">
                        <h2>Các cuộc kêu gọi đã kết thúc</h2>
                    </div>
                    <div className="row">
                        {eventsExpired?.length &&
                            eventsExpired.map((item) => {
                                return (
                                    <div className="col-lg-4">
                                        <div className="event-item">
                                            <img
                                                src={item.thumbnail.url || "img/event-1.jpg"}
                                                alt="Image"
                                            />
                                            <div className="event-content">
                                                <div>
                                                    <div className="event-text">
                                                        <h3>
                                                            {item.title.length > 35
                                                                ? item.title.substring(0, 35) +
                                                                  "..."
                                                                : item.title}
                                                        </h3>
                                                        <hr />
                                                        <h4
                                                            style={{
                                                                fontSize: 15,
                                                                margin: "30px 0 10px 0",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            Từ:{" "}
                                                            {Intl.DateTimeFormat("en-US", {
                                                                year: "numeric",
                                                                month: "2-digit",
                                                                day: "2-digit",
                                                            }).format(
                                                                new Date(item.createdAt),
                                                            )}{" "}
                                                            {" ~ "}
                                                            {Intl.DateTimeFormat("en-US", {
                                                                year: "numeric",
                                                                month: "2-digit",
                                                                day: "2-digit",
                                                            }).format(new Date(item.expiredAt))}
                                                        </h4>
                                                        <div>
                                                            <div className="row">
                                                                <div className="col-4">
                                                                    <p>Người kêu gọi: </p>
                                                                    <p>Địa chỉ: </p>
                                                                    <p>Hiện tại: </p>
                                                                    <p> Mục tiêu: </p>
                                                                </div>
                                                                <div className="col-8">
                                                                    <p>
                                                                        <strong
                                                                            style={{ color: "red" }}
                                                                        >
                                                                            {
                                                                                item.charityCall
                                                                                    .user.fullName
                                                                            }
                                                                        </strong>
                                                                    </p>
                                                                    <p>
                                                                        <strong
                                                                            style={{ color: "red" }}
                                                                        >
                                                                            {
                                                                                item.charityCall
                                                                                    .user.address
                                                                            }
                                                                        </strong>
                                                                    </p>
                                                                    <p>
                                                                        <strong
                                                                            style={{ color: "red" }}
                                                                        >
                                                                            {new Intl.NumberFormat(
                                                                                "vi-VN",
                                                                                {
                                                                                    style: "currency",
                                                                                    currency: "VND",
                                                                                },
                                                                            ).format(
                                                                                item.amountL ||
                                                                                    1000000,
                                                                            )}
                                                                        </strong>
                                                                    </p>
                                                                    <p>
                                                                        <strong
                                                                            style={{ color: "red" }}
                                                                        >
                                                                            {new Intl.NumberFormat(
                                                                                "vi-VN",
                                                                                {
                                                                                    style: "currency",
                                                                                    currency: "VND",
                                                                                },
                                                                            ).format(
                                                                                item.charityCall
                                                                                    .amountLimit ||
                                                                                    1000000,
                                                                            )}
                                                                        </strong>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <hr />
                                                    <p className="p-description">
                                                        {item.description.length > 150
                                                            ? item.description.substring(0, 150) +
                                                              "..."
                                                            : item.description}
                                                    </p>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-around",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Link
                                                            className="btn btn-custom"
                                                            to={`/events/${item.id}`}
                                                            // style={{ padding: 10 }}
                                                        >
                                                            Chi Tiết
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            {/* Event End */}
        </>
    );
};

export default Event;
