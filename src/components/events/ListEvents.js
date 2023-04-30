import { memo } from "react";
// import { useTranslation } from "react-i18next";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom";

const ListEvents = ({ events }) => {
    console.log("tong so:");
    console.log(events?.data);
    return (
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
                                        events.data.items?.[0]?.thumbnail?.url || "./img/post-1.jpg"
                                    }
                                    alt="Image"
                                />
                            </div>
                            <div className="causes-progress">
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow={85}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <span>85%</span>
                                    </div>
                                </div>
                                <div className="progress-text">
                                    <p>
                                        <strong>Raised:</strong>&ensp;
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(events.data.items?.[0]?.event?.amount || 1000000)}
                                    </p>
                                    <p>
                                        <strong>Goal:</strong>&ensp;
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(
                                            events.data.items?.[0]?.charityCall?.amountLimit ||
                                                50000,
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="causes-text">
                                <h3>{events.data.items?.[0]?.title}</h3>
                                <p>
                                    {events.data.items?.[0]?.description?.substring(0, 150)} .....
                                </p>
                            </div>
                            <div className="causes-btn">
                                <Link
                                    className="btn btn-custom"
                                    to={`/events/${events.data.items?.[0]?.id}`}
                                >
                                    Xem
                                </Link>
                                <a className="btn btn-custom">Donate Now</a>
                            </div>
                        </div>
                        <div className="causes-item">
                            <div className="causes-img">
                                <img
                                    style={{ height: 300, objectFit: "cover" }}
                                    src={
                                        events.data.items?.[1]?.thumbnail?.url || "./img/post-1.jpg"
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
                                                ((events.data.items?.[0]?.event?.amount ||
                                                    1000000) /
                                                    (events.data.items?.[0]?.charityCall
                                                        ?.amountLimit || 50000)) *
                                                100
                                            }
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        >
                                            <span>
                                                {(
                                                    ((events.data.items?.[0]?.event?.amount ||
                                                        1000000) /
                                                        (events.data.items?.[0]?.charityCall
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
                                                events.data.items?.[1]?.event?.amount || 1000000,
                                            )}
                                        </p>
                                        <p>
                                            <strong>Goal:</strong>&ensp;
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(
                                                events.data.items?.[1]?.charityCall?.amountLimit ||
                                                    50000,
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="causes-text">
                                <h3>{events.data.items?.[1]?.title}</h3>
                                <p>
                                    {events.data.items?.[1]?.description?.substring(0, 150)} .....
                                </p>
                            </div>
                            <div className="causes-btn">
                                <Link
                                    className="btn btn-custom"
                                    to={`/events/${events.data.items?.[1]?.id}`}
                                >
                                    Xem
                                </Link>
                                <a className="btn btn-custom">Donate Now</a>
                            </div>
                        </div>
                        `
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListEvents;
