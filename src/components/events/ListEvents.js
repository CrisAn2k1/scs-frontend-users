import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../layouts/Loading";
import moment from "moment";

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

const percent = (amount, amountLimit) => {
    amount = +amount.replaceAll(".", "");
    return ((amount / +amountLimit) * 100).toFixed(2);
};

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
                                                    events.items?.[0]?.moneyDonations.length &&
                                                    percent(
                                                        sumTotalAmount(
                                                            events.items?.[0]?.moneyDonations,
                                                        ),
                                                        events.items?.[0]?.charityCall?.amountLimit,
                                                    )
                                                }
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            >
                                                <span>
                                                    {events.items?.[0]?.moneyDonations.length &&
                                                        percent(
                                                            sumTotalAmount(
                                                                events.items?.[0]?.moneyDonations,
                                                            ),
                                                            events.items?.[0]?.charityCall
                                                                ?.amountLimit,
                                                        )}
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                        <div className="progress-text">
                                            <p>
                                                <strong>Raised:</strong>&ensp;
                                                {events.items?.[0]?.moneyDonations?.length
                                                    ? sumTotalAmount(
                                                          events.items?.[0]?.moneyDonations,
                                                      )
                                                    : 0}{" "}
                                                ₫
                                            </p>
                                            <p>
                                                <strong>Goal:</strong>&ensp;
                                                {formatNumber(
                                                    events.items?.[0]?.charityCall?.amountLimit,
                                                )}{" "}
                                                ₫
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
                                    {moment(events.items?.[0]?.expiredAt).isAfter() && (
                                        <Link
                                            className="btn btn-custom"
                                            to={`/money-donation/${events.items?.[0]?.id}`}
                                        >
                                            Quyên Góp
                                        </Link>
                                    )}
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
                                                events.items?.[1]?.moneyDonations.length &&
                                                percent(
                                                    sumTotalAmount(
                                                        events.items?.[1]?.moneyDonations,
                                                    ),
                                                    events.items?.[1]?.charityCall?.amountLimit,
                                                )
                                            }
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        >
                                            <span>
                                                {events.items?.[1]?.moneyDonations.length &&
                                                    percent(
                                                        sumTotalAmount(
                                                            events.items?.[1]?.moneyDonations,
                                                        ),
                                                        events.items?.[1]?.charityCall?.amountLimit,
                                                    )}
                                                %
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress-text">
                                        <p>
                                            <strong>Raised:</strong>&ensp;
                                            {events.items?.[1]?.moneyDonations?.length
                                                ? sumTotalAmount(events.items?.[1]?.moneyDonations)
                                                : 0}{" "}
                                            ₫
                                        </p>
                                        <p>
                                            <strong>Goal:</strong>&ensp;
                                            {formatNumber(
                                                events.items?.[1]?.charityCall?.amountLimit,
                                            )}{" "}
                                            ₫
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
                                    {moment(events.items?.[1]?.expiredAt).isAfter() && (
                                        <Link
                                            className="btn btn-custom"
                                            to={`/money-donation/${events.items?.[1]?.id}`}
                                        >
                                            Quyên Góp
                                        </Link>
                                    )}
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
                                                    events.items?.[2]?.moneyDonations.length &&
                                                    percent(
                                                        sumTotalAmount(
                                                            events.items?.[2]?.moneyDonations,
                                                        ),
                                                        events.items?.[2]?.charityCall?.amountLimit,
                                                    )
                                                }
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            >
                                                <span>
                                                    {events.items?.[2]?.moneyDonations.length &&
                                                        percent(
                                                            sumTotalAmount(
                                                                events.items?.[2]?.moneyDonations,
                                                            ),
                                                            events.items?.[2]?.charityCall
                                                                ?.amountLimit,
                                                        )}
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                        <div className="progress-text">
                                            <p>
                                                <strong>Raised:</strong>&ensp;
                                                {events.items?.[2]?.moneyDonations?.length
                                                    ? sumTotalAmount(
                                                          events.items?.[2]?.moneyDonations,
                                                      )
                                                    : 0}{" "}
                                                ₫
                                            </p>
                                            <p>
                                                <strong>Goal:</strong>&ensp;
                                                {formatNumber(
                                                    events.items?.[2]?.charityCall?.amountLimit,
                                                )}{" "}
                                                ₫
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
                                    {moment(events.items?.[2]?.expiredAt).isAfter() && (
                                        <Link
                                            className="btn btn-custom"
                                            to={`/money-donation/${events.items?.[2]?.id}`}
                                        >
                                            Quyên Góp
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="causes-item">
                                <div className="causes-img">
                                    <img
                                        style={{ height: 300, objectFit: "cover" }}
                                        src={
                                            events.items?.[3]?.thumbnail?.url || "./img/post-1.jpg"
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
                                                    events.items?.[3]?.moneyDonations.length &&
                                                    percent(
                                                        sumTotalAmount(
                                                            events.items?.[3]?.moneyDonations,
                                                        ),
                                                        events.items?.[3]?.charityCall?.amountLimit,
                                                    )
                                                }
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            >
                                                <span>
                                                    {events.items?.[3]?.moneyDonations.length &&
                                                        percent(
                                                            sumTotalAmount(
                                                                events.items?.[3]?.moneyDonations,
                                                            ),
                                                            events.items?.[3]?.charityCall
                                                                ?.amountLimit,
                                                        )}
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                        <div className="progress-text">
                                            <p>
                                                <strong>Raised:</strong>&ensp;
                                                {events.items?.[3]?.moneyDonations?.length
                                                    ? sumTotalAmount(
                                                          events.items?.[3]?.moneyDonations,
                                                      )
                                                    : 0}{" "}
                                                ₫
                                            </p>
                                            <p>
                                                <strong>Goal:</strong>&ensp;
                                                {formatNumber(
                                                    events.items?.[3]?.charityCall?.amountLimit,
                                                )}{" "}
                                                ₫
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="causes-text">
                                    <h3>{events.items?.[3]?.title}</h3>
                                    <p className="p-description">
                                        {events.items?.[3]?.description?.substring(0, 150)} .....
                                    </p>
                                </div>
                                <div className="causes-btn">
                                    <Link
                                        className="btn btn-custom"
                                        to={`/events/${events.items?.[3]?.id}`}
                                    >
                                        Xem Thêm
                                    </Link>
                                    {moment(events.items?.[3]?.expiredAt).isAfter() && (
                                        <Link
                                            className="btn btn-custom"
                                            to={`/money-donation/${events.items?.[3]?.id}`}
                                        >
                                            Quyên Góp
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="causes-item">
                                <div className="causes-img">
                                    <img
                                        style={{ height: 300, objectFit: "cover" }}
                                        src={
                                            events.items?.[4]?.thumbnail?.url || "./img/post-1.jpg"
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
                                                    events.items?.[4]?.moneyDonations.length &&
                                                    percent(
                                                        sumTotalAmount(
                                                            events.items?.[4]?.moneyDonations,
                                                        ),
                                                        events.items?.[4]?.charityCall?.amountLimit,
                                                    )
                                                }
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            >
                                                <span>
                                                    {events.items?.[4]?.moneyDonations.length &&
                                                        percent(
                                                            sumTotalAmount(
                                                                events.items?.[4]?.moneyDonations,
                                                            ),
                                                            events.items?.[4]?.charityCall
                                                                ?.amountLimit,
                                                        )}
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                        <div className="progress-text">
                                            <p>
                                                <strong>Raised:</strong>&ensp;
                                                {events.items?.[4]?.moneyDonations?.length
                                                    ? sumTotalAmount(
                                                          events.items?.[4]?.moneyDonations,
                                                      )
                                                    : 0}{" "}
                                                ₫
                                            </p>
                                            <p>
                                                <strong>Goal:</strong>&ensp;
                                                {formatNumber(
                                                    events.items?.[4]?.charityCall?.amountLimit,
                                                )}{" "}
                                                ₫
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="causes-text">
                                    <h3>{events.items?.[4]?.title}</h3>
                                    <p className="p-description">
                                        {events.items?.[4]?.description?.substring(0, 150)} .....
                                    </p>
                                </div>
                                <div className="causes-btn">
                                    <Link
                                        className="btn btn-custom"
                                        to={`/events/${events.items?.[4]?.id}`}
                                    >
                                        Xem Thêm
                                    </Link>
                                    {moment(events.items?.[4]?.expiredAt).isAfter() && (
                                        <Link
                                            className="btn btn-custom"
                                            to={`/money-donation/${events.items?.[4]?.id}`}
                                        >
                                            Quyên Góp
                                        </Link>
                                    )}
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
