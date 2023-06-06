import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../layouts/Loading";
const ListEvents = ({ events }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        events?.items ? setIsLoading(false) : setIsLoading(true);
    }, [events]);

    return (
        <>
            <Loading hidden={!isLoading}></Loading>
            <>
                <div className="causes">
                    <div className="container">
                        <div className="section-header text-center">
                            <p>Các Lời Kêu Gọi Quyên Góp</p>
                            <h2 style={{ fontSize: 30 }}>
                                Hãy Cùng Chung Tay Góp Sức Giúp Đỡ Những Hoàn Cảnh Khó Khăn
                            </h2>
                        </div>
                        <div className="owl-carousel causes-carousel">
                            <div className="causes-item">
                                <div className="causes-img">
                                    <img
                                        style={{ height: 300, objectFit: "cover" }}
                                        src={
                                            events.items?.[0]?.thumbnail?.url || "./img/post-1.jpg"
                                        }
                                        alt="Image"
                                    />
                                </div>
                                <div className="causes-progress">
                                    <div>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                aria-valuenow={
                                                    ((events.items?.[0]?.event?.amount || 1000000) /
                                                        events.items?.[0]?.charityCall
                                                            ?.amountLimit) *
                                                    100
                                                }
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            >
                                                <span>
                                                    {(
                                                        ((events.items?.[0]?.event?.amount ||
                                                            1000000) /
                                                            (events.items?.[0]?.charityCall
                                                                ?.amountLimit || 5000000)) *
                                                        100
                                                    )
                                                        .toString()
                                                        .substring(0, 4)}
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                        <div className="progress-text">
                                            <p>
                                                <strong>Raised:</strong>&ensp;
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(
                                                    events.items?.[0]?.event?.amount || 1000000,
                                                )}
                                            </p>
                                            <p>
                                                <strong>Goal:</strong>&ensp;
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(
                                                    events.items?.[0]?.charityCall?.amountLimit ||
                                                        50000,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="causes-text">
                                    <h3>{events.items?.[0]?.title}</h3>
                                    <p className="p-description">
                                        {events.items?.[0]?.description?.substring(0, 150)} .....
                                    </p>
                                </div>
                                <div className="causes-btn">
                                    <Link
                                        className="btn btn-custom"
                                        to={`/events/${events.items?.[0]?.id}`}
                                    >
                                        Xem Thêm
                                    </Link>
                                    <Link
                                        className="btn btn-custom"
                                        to={`/money-donation/${events.items?.[0]?.id}`}
                                    >
                                        Quyên Góp
                                    </Link>
                                </div>
                            </div>

                            <div className="causes-item">
                                <div className="causes-img">
                                    <img
                                        style={{ height: 300, objectFit: "cover" }}
                                        src={
                                            events.items?.[1]?.thumbnail?.url || "./img/post-1.jpg"
                                        }
                                        alt="Image"
                                    />
                                </div>
                                <div className="causes-progress">
                                    <div className="progress">
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            aria-valuenow={
                                                ((events.items?.[1]?.event?.amount || 1500000) /
                                                    events.items?.[1]?.charityCall?.amountLimit) *
                                                100
                                            }
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        >
                                            <span>
                                                {(
                                                    ((events.items?.[1]?.event?.amount || 1500000) /
                                                        (events.items?.[1]?.charityCall
                                                            ?.amountLimit || 50000)) *
                                                    100
                                                )
                                                    .toString()
                                                    .substring(0, 4)}
                                                %
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress-text">
                                        <p>
                                            <strong>Raised:</strong>&ensp;
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(events.items?.[1]?.event?.amount || 1500000)}
                                        </p>
                                        <p>
                                            <strong>Goal:</strong>&ensp;
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(
                                                events.items?.[1]?.charityCall?.amountLimit ||
                                                    50000,
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="causes-text">
                                    <h3>{events.items?.[1]?.title}</h3>
                                    <p className="p-description">
                                        {events.items?.[1]?.description?.substring(0, 150)} .....
                                    </p>
                                </div>
                                <div className="causes-btn">
                                    <Link
                                        className="btn btn-custom"
                                        to={`/events/${events.items?.[1]?.id}`}
                                    >
                                        Xem Thêm
                                    </Link>
                                    <a className="btn btn-custom">Quyên Góp</a>
                                </div>
                            </div>

                            <div className="causes-item">
                                <div className="causes-img">
                                    <img
                                        style={{ height: 300, objectFit: "cover" }}
                                        src={
                                            events.items?.[2]?.thumbnail?.url || "./img/post-1.jpg"
                                        }
                                        alt="Image"
                                    />
                                </div>
                                <div className="causes-progress">
                                    <div>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                // aria-valuenow={5}
                                                aria-valuenow={
                                                    ((events.items?.[2]?.event?.amount || 1000000) /
                                                        events.items?.[2]?.charityCall
                                                            ?.amountLimit) *
                                                    100
                                                }
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            >
                                                <span>
                                                    {(
                                                        ((events.items?.[2]?.event?.amount ||
                                                            1000000) /
                                                            (events.items?.[2]?.charityCall
                                                                ?.amountLimit || 50000)) *
                                                        100
                                                    )
                                                        .toString()
                                                        .substring(0, 4)}
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                        <div className="progress-text">
                                            <p>
                                                <strong>Raised:</strong>&ensp;
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(
                                                    events.items?.[2]?.event?.amount || 1000000,
                                                )}
                                            </p>
                                            <p>
                                                <strong>Goal:</strong>&ensp;
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(
                                                    events.items?.[2]?.charityCall?.amountLimit ||
                                                        50000,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="causes-text">
                                    <h3>{events.items?.[2]?.title}</h3>
                                    <p className="p-description">
                                        {events.items?.[2]?.description?.substring(0, 150)} .....
                                    </p>
                                </div>
                                <div className="causes-btn">
                                    <Link
                                        className="btn btn-custom"
                                        to={`/events/${events.items?.[2]?.id}`}
                                    >
                                        Xem Thêm
                                    </Link>
                                    <a className="btn btn-custom">Quyên Góp</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default ListEvents;
