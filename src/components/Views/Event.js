import React, { useEffect, useState } from "react";

import EventDetail from "../events/EventDetail";
import { Link } from "react-router-dom";
import { events$ } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/actions/events";
import Loading from "../layouts/Loading";

const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
};

const sumTotalAmount = (moneyDonations) => {
    return formatNumber(
        moneyDonations.reduce(
            (accumulator, currentValue) => accumulator + +currentValue?.amount,
            0,
        ),
    );
};

const Event = () => {
    const events = useSelector(events$);
    const dispatch = useDispatch();

    const [searching, setSearching] = useState("");
    const [listEvent, setListEvent] = useState();
    const [eventsNotExpired, setEventsNotExpired] = useState();
    const [eventsExpired, setEventsExpired] = useState();

    useEffect(() => {
        if (events?.data?.length === 0) {
            dispatch(getEvents.getEventsRequest());
        }
    }, []);

    const onChangeSearch = (val) => {
        setSearching(val);

        setListEvent(events?.data?.items.filter((p) => p.title.toLowerCase().includes(val)));
        console.log(val);
    };

    let dateNow = new Date(
        new Date().getFullYear() +
            "-0" +
            String(new Date().getMonth() + 1) +
            "-" +
            new Date().getDate(),
    ).getTime();

    useEffect(() => {
        if (listEvent?.length) {
            setEventsNotExpired(
                listEvent.filter(
                    (p) => new Date(p.expiredAt.substring(0, 10)).getTime() >= dateNow,
                ),
            );
            setEventsExpired(
                listEvent.filter((p) => new Date(p.expiredAt.substring(0, 10)).getTime() < dateNow),
            );
        }
    }, listEvent);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        events?.data?.items ? setIsLoading(false) : setIsLoading(true);
        setListEvent(events?.data?.items);
        events.singleEventDetail = null;
    }, [events]);

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

            <div
                className="searching"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    className="searching-bg"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h5
                        className="text-find"
                        style={{
                            marginRight: 10,
                            fontWeight: "bold",
                            fontFamily: `'Muli',sans-serif,"Comic Sans MS", "Poppins-Regular", "Arial", "Times"`,
                        }}
                    >
                        Tìm Kiếm
                    </h5>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                        }}
                    >
                        <input
                            className="input-find"
                            type="text"
                            value={searching}
                            onChange={(e) => onChangeSearch(e.target.value)}
                            style={{ paddingLeft: 40, width: 500 }}
                        ></input>
                        <i class="bi bi-search" style={{ position: "absolute", left: 10 }}></i>
                    </div>
                </div>
            </div>
            <div className="event">
                <div className="container" style={{ maxWidth: "90vw" }}>
                    <div className="section-header text-center">
                        <h2>Các cuộc kêu gọi hiện tại</h2>
                    </div>
                    <div className="row">
                        {eventsNotExpired?.length ? (
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
                                                            {Intl.DateTimeFormat("vi-VN", {
                                                                year: "numeric",
                                                                month: "2-digit",
                                                                day: "2-digit",
                                                            }).format(
                                                                new Date(item.createdAt),
                                                            )}{" "}
                                                            {" ~ "}
                                                            {Intl.DateTimeFormat("vi-VN", {
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
                                                                        {item.moneyDonations.length
                                                                            ? sumTotalAmount(
                                                                                  item.moneyDonations,
                                                                              )
                                                                            : 0}{" "}
                                                                        vnđ
                                                                    </strong>
                                                                </p>
                                                                <p>
                                                                    <strong
                                                                        style={{ color: "red" }}
                                                                    >
                                                                        {formatNumber(
                                                                            item.charityCall
                                                                                .amountLimit,
                                                                        )}{" "}
                                                                        vnđ
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
                                                        className="event-action-btn"
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
                            })
                        ) : (
                            <>
                                <h4
                                    style={{
                                        textAlign: "center",
                                        width: "100%",
                                        marginBottom: 100,
                                    }}
                                >
                                    Hiện tại không có kêu gọi nào
                                </h4>
                            </>
                        )}
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
                                                            {Intl.DateTimeFormat("vi-VN", {
                                                                year: "numeric",
                                                                month: "2-digit",
                                                                day: "2-digit",
                                                            }).format(
                                                                new Date(item.createdAt),
                                                            )}{" "}
                                                            {" ~ "}
                                                            {Intl.DateTimeFormat("vi-VN", {
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
                                                                            {item.moneyDonations
                                                                                .length
                                                                                ? sumTotalAmount(
                                                                                      item.moneyDonations,
                                                                                  )
                                                                                : 0}{" "}
                                                                            vnđ
                                                                        </strong>
                                                                    </p>
                                                                    <p>
                                                                        <strong
                                                                            style={{ color: "red" }}
                                                                        >
                                                                            {formatNumber(
                                                                                item.charityCall
                                                                                    .amountLimit,
                                                                            )}{" "}
                                                                            vnđ
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
                                                        className="event-action-btn"
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
