import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { events$ } from "../../redux/selectors";
import { getEventDetail, getEvents } from "../../redux/actions/events";
import ListDonation from "./ListDonation";
import ListPosts from "../posts/ListPosts";
import Loading from "../layouts/Loading";
import MoreListEvent from "./MoreListEvent";
import Swal from "sweetalert2";
import moment from "moment";
// import Pagination from "@mui/material/Pagination";

const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
};

const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(date));
};

const sumTotalAmount = (moneyDonations) => {
    return formatNumber(
        moneyDonations.reduce(
            (accumulator, currentValue) => accumulator + +currentValue?.amount,
            0,
        ),
    );
};

const EventDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const events = useSelector(events$);

    useEffect(() => {
        dispatch(getEventDetail.getEventDetailRequest(id));
        dispatch(getEvents.getEventsRequest());
    }, [id]);

    const previewImage = (event) => {
        Swal.fire({
            imageUrl: event.target.src,
            imageAlt: "Custom image",
            showConfirmButton: false,
        });
    };

    const lstString = events?.singleEventDetail?.description?.split("\n");
    console.log(events.singleEventDetail);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        events?.singleEventDetail ? setIsLoading(false) : setIsLoading(true);
    }, [events]);

    const previewImg = (e) => {
        console.log(e.target.src);
        Swal.fire({
            imageUrl: e.target.src,
            imageWidth: 500,
            showConfirmButton: false,
        });
    };
    return (
        <>
            {/* Page Header Start */}
            <Loading hidden={!isLoading}></Loading>
            <div className="page-header" style={{ padding: "150px 0px 20px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2
                                style={{
                                    color: "#fdbe33",
                                    textAlign: "center",
                                    fontSize: 40,
                                    fontFamily: `"Comic Sans MS", Poppins-Regular, Arial, Times`,
                                }}
                            >
                                {events?.singleEventDetail?.title}
                            </h2>
                        </div>
                        <div className="col-12">
                            <a>Give Is Receive</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            <div>
                <h1></h1>
            </div>
            <div className="single" style={{ paddingTop: 0 }}>
                <div className="container" style={{ maxWidth: "90vw" }}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="single-content">
                                <img
                                    src={
                                        events?.singleEventDetail?.thumbnail?.url ??
                                        "/img/charity.png"
                                    }
                                    onClick={(e) => previewImg(e)}
                                />
                                <h2
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "left",
                                        marginBottom: 10,
                                    }}
                                >
                                    {events?.singleEventDetail?.title}
                                </h2>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        paddingRight: 20,
                                    }}
                                >
                                    <div>
                                        <h6 style={{ marginLeft: 15, marginTop: 15 }}>
                                            {" Người kêu gọi: "}{" "}
                                            <strong
                                                style={{
                                                    color: "red",
                                                }}
                                            >
                                                {
                                                    events?.singleEventDetail?.charityCall?.user
                                                        ?.fullName
                                                }
                                            </strong>
                                        </h6>
                                        <h6
                                            style={{
                                                marginLeft: 15,
                                                marginTop: 15,
                                            }}
                                        >
                                            {" Số tiền: "}
                                            <strong
                                                style={{
                                                    color: "red",
                                                }}
                                            >
                                                {events?.singleEventDetail?.moneyDonations?.length
                                                    ? sumTotalAmount(
                                                          events?.singleEventDetail?.moneyDonations,
                                                      )
                                                    : 0}{" "}
                                                {" / " +
                                                    formatNumber(
                                                        events?.singleEventDetail?.charityCall
                                                            ?.amountLimit,
                                                    )}{" "}
                                                vnđ
                                            </strong>
                                        </h6>
                                        <h6 style={{ marginLeft: 15, marginTop: 15 }}>
                                            {" Thời gian kêu gọi: "}{" "}
                                            {events?.singleEventDetail &&
                                                formatDate(events?.singleEventDetail?.createdAt) +
                                                    " ~ " +
                                                    formatDate(
                                                        events?.singleEventDetail?.expiredAt,
                                                    )}
                                        </h6>
                                    </div>
                                    {moment(events?.singleEventDetail?.expiredAt).isAfter() && (
                                        <Link
                                            to={`/money-donation/${events?.singleEventDetail?.id}`}
                                            type="button"
                                            className="btn btn-custom-mirror"
                                            style={{ position: "unset", display: "block" }}
                                        >
                                            Quyên Góp
                                        </Link>
                                    )}
                                </div>

                                <hr></hr>
                                <div className="description-event" style={{ padding: "0 15px" }}>
                                    {lstString?.length &&
                                        lstString.map((item) => {
                                            return (
                                                <p
                                                    style={{
                                                        marginBottom: 7,
                                                        textAlign: "justify",
                                                    }}
                                                >
                                                    &emsp;&emsp; {item}
                                                </p>
                                            );
                                        })}
                                </div>
                            </div>
                            <div>
                                <h4 className="proofs">Các Minh Chứng</h4>
                                <div className="single-bio">
                                    <div
                                        className="single-bio-img"
                                        style={{
                                            display: "flex",
                                            justifyContent: "left",
                                            alignItems: "center",
                                        }}
                                    >
                                        {events?.singleEventDetail?.charityCall?.proofs?.length ? (
                                            events?.singleEventDetail?.charityCall?.proofs.map(
                                                (item) => {
                                                    return (
                                                        <img
                                                            src={item.url}
                                                            onClick={(e) => previewImage(e)}
                                                        />
                                                    );
                                                },
                                            )
                                        ) : (
                                            <div>
                                                <p
                                                    style={{
                                                        textAlign: "center",
                                                        width: "max-content",
                                                    }}
                                                >
                                                    Không có minh chứng nào!
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar">
                                <div className="sidebar-widget">
                                    <ListDonation
                                        listDonation={events?.singleEventDetail?.moneyDonations}
                                    />
                                </div>
                                <hr style={{ marginTop: 45 }} />
                                <div className="sidebar-widget">
                                    <ListPosts
                                        posts={events?.singleEventDetail?.posts}
                                        title={"Các Bài Viết"}
                                    />
                                </div>
                                <hr />
                            </div>
                            <div className="sidebar">
                                <div className="sidebar-widget">
                                    <MoreListEvent
                                        events={events?.data?.items?.filter((p) => p.id != id)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventDetail;
