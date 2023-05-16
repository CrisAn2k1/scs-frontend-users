import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { events$ } from "../../redux/selectors";
import { getEventDetail } from "../../redux/actions/events";

const EventDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const events = useSelector(events$);

    useEffect(() => {
        dispatch(getEventDetail.getEventDetailRequest(id));
    }, [id]);
    const lstString = events?.singleEventDetail?.posts?.[0]?.description?.split("\\n");
    console.log(lstString);
    console.log(events);
    return (
        <>
            {/* Page Header Start */}
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
                        <div className="col-lg-9">
                            <div className="event">
                                <div className="container">
                                    <div className="row">
                                        {events.singleEventDetail?.posts?.length &&
                                            events.singleEventDetail?.posts?.map((item) => {
                                                {
                                                    item.createdAt = new Intl.DateTimeFormat(
                                                        "en-US",
                                                        {
                                                            hour12: true,
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            year: "numeric",
                                                            month: "2-digit",
                                                            day: "2-digit",
                                                        },
                                                    ).format(new Date(item.createdAt));
                                                }
                                                return (
                                                    <>
                                                        <div
                                                            className="col-lg-8"
                                                            style={{ padding: 15 }}
                                                            title={item.title.toLowerCase()}
                                                        >
                                                            <div className="event-item">
                                                                <img
                                                                    src={
                                                                        item.thumbnail?.url ??
                                                                        "/img/charity.png"
                                                                    }
                                                                    alt="Image"
                                                                    style={{
                                                                        maxWidth: "100%",
                                                                        height: 300,
                                                                        objectFit: "cover",
                                                                    }}
                                                                />
                                                                <div className="event-content">
                                                                    <div className="event-meta">
                                                                        <p>
                                                                            <i className="fa fa-calendar-alt" />
                                                                            {item.createdAt.substring(
                                                                                0,
                                                                                10,
                                                                            )}
                                                                        </p>
                                                                        <p>
                                                                            <i className="far fa-clock" />
                                                                            {item.createdAt.substring(
                                                                                11,
                                                                                item.createdAt
                                                                                    .length,
                                                                            )}
                                                                        </p>
                                                                        <p>
                                                                            <i className="fa fa-map-marker-alt" />
                                                                            Tp.HCM
                                                                        </p>
                                                                    </div>
                                                                    <div
                                                                        className="event-text"
                                                                        style={{ width: "69%" }}
                                                                    >
                                                                        <h3
                                                                            style={{
                                                                                fontSize: "22px",
                                                                                fontFamily: `"Comic Sans MS", "Poppins-Regular", "Arial", "Times"`,
                                                                                textAlign:
                                                                                    "justify",
                                                                                whiteSpace:
                                                                                    "nowrap",
                                                                                overflow: "hidden",
                                                                                textOverflow:
                                                                                    "ellipsis",
                                                                                textTransform:
                                                                                    "capitalize",
                                                                            }}
                                                                        >
                                                                            {item.title}
                                                                        </h3>
                                                                        <p
                                                                            style={{
                                                                                textAlign:
                                                                                    "justify",
                                                                            }}
                                                                        >
                                                                            {item?.description.substring(
                                                                                0,
                                                                                100,
                                                                            )}
                                                                            ...
                                                                        </p>
                                                                        <Link
                                                                            className="btn btn-custom"
                                                                            to={`/posts/${item.id}`}
                                                                            style={{
                                                                                fontFamily: `"Comic Sans MS", "Poppins-Regular", "Arial", "Times"`,
                                                                            }}
                                                                        >
                                                                            Chi Tiết
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>

                            <div className="single-tags">
                                <a href="">National</a>
                                <a href="">International</a>
                                <a href="">Economics</a>
                                <a href="">Politics</a>
                                <a href="">Lifestyle</a>
                                <a href="">Technology</a>
                                <a href="">Trades</a>
                            </div>
                            <div className="single-bio">
                                <div className="single-bio-img">
                                    <img src="img/user.jpg" />
                                </div>
                                <div className="single-bio-text">
                                    <h3>Author Name</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet elit. Integer lorem augue purus
                                        mollis sapien, non eros leo in nunc. Donec a nulla vel
                                        turpis tempor ac vel justo. In hac platea dictumst.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="sidebar">
                                <div className="sidebar-widget">
                                    <h2 className="widget-title">Các Bài Viết</h2>
                                    <div className="recent-post">
                                        {events.singleEventDetail?.posts?.length &&
                                            events.singleEventDetail?.posts?.map((item) => {
                                                {
                                                    item.createdAt = new Intl.DateTimeFormat(
                                                        "en-US",
                                                        {
                                                            hour12: true,
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            year: "numeric",
                                                            month: "2-digit",
                                                            day: "2-digit",
                                                        },
                                                    )
                                                        .format(new Date(item.createdAt))
                                                        .substring(0, 10);
                                                }
                                                return (
                                                    <>
                                                        <Link
                                                            to={`/posts/${item.id}`}
                                                            title={item.title.toLowerCase()}
                                                        >
                                                            <div className="post-item">
                                                                <div
                                                                    className="post-img"
                                                                    style={{ width: "30" }}
                                                                >
                                                                    <img
                                                                        src={
                                                                            item.thumbnail?.url ??
                                                                            "/img/charity.png"
                                                                        }
                                                                    />
                                                                </div>
                                                                <div
                                                                    className="post-text"
                                                                    style={{ width: "70%" }}
                                                                >
                                                                    <h4
                                                                        style={{
                                                                            fontFamily: `"Comic Sans MS", "Poppins-Regular", "Arial", "Times"`,
                                                                            textAlign: "justify",
                                                                            whiteSpace: "nowrap",
                                                                            overflow: "hidden",
                                                                            textOverflow:
                                                                                "ellipsis",
                                                                            textTransform:
                                                                                "capitalize",
                                                                            fontSize: 16,
                                                                            fontWeight: 600,
                                                                        }}
                                                                    >
                                                                        {" "}
                                                                        {item.title}
                                                                    </h4>
                                                                    <div className="post-meta">
                                                                        <p
                                                                            style={{
                                                                                color: "#9c6969fc",
                                                                            }}
                                                                        >
                                                                            <i class="fa fa-calendar-alt"></i>
                                                                            &ensp;
                                                                            {item.createdAt}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </>
                                                );
                                            })}
                                    </div>
                                </div>

                                <hr />

                                <div className="sidebar-widget">
                                    <div className="tab-post">
                                        <ul className="nav nav-pills nav-justified">
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link active"
                                                    data-toggle="pill"
                                                    href="#proofs"
                                                    style={{
                                                        fontFamily: `sans-serif`,
                                                    }}
                                                >
                                                    Minh Chứng
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link"
                                                    data-toggle="pill"
                                                    href="#moneyDonations"
                                                    style={{
                                                        fontFamily: `sans-serif`,
                                                    }}
                                                >
                                                    DS Đã Ủng Hộ
                                                </a>
                                            </li>
                                        </ul>

                                        <div className="tab-content">
                                            <div
                                                id="proofs"
                                                className="container tab-pane fade active show"
                                            >
                                                {events?.singleEventDetail?.charityCall?.proofs
                                                    .length ? (
                                                    events?.singleEventDetail?.charityCall?.proofs?.map(
                                                        (proof) => {
                                                            return (
                                                                <>
                                                                    <div className="post-item">
                                                                        <div className="post-img">
                                                                            <img src={proof?.url} />
                                                                        </div>
                                                                        <div className="post-text">
                                                                            <a href="">
                                                                                Lorem ipsum dolor
                                                                                sit amet consec
                                                                                adipis elit
                                                                            </a>
                                                                            <div className="post-meta">
                                                                                <p>
                                                                                    By
                                                                                    <a href="">
                                                                                        Admin
                                                                                    </a>
                                                                                </p>
                                                                                <p>
                                                                                    In
                                                                                    <a href="">
                                                                                        Web Design
                                                                                    </a>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        },
                                                    )
                                                ) : (
                                                    <></>
                                                )}
                                            </div>

                                            <div
                                                id="moneyDonations"
                                                className="container tab-pane fade"
                                            >
                                                {events.singleEventDetail?.moneyDonations
                                                    ?.length ? (
                                                    events.singleEventDetail?.moneyDonations?.map(
                                                        (proof) => {
                                                            return (
                                                                <>
                                                                    <div className="post-item">
                                                                        <div className="post-img">
                                                                            <img src="img/post-1.jpg" />
                                                                        </div>
                                                                        <div className="post-text">
                                                                            <a href="">
                                                                                Lorem ipsum dolor
                                                                                sit amet consec
                                                                                adipis elit
                                                                            </a>
                                                                            <div className="post-meta">
                                                                                <p>
                                                                                    By
                                                                                    <a href="">
                                                                                        Admin
                                                                                    </a>
                                                                                </p>
                                                                                <p>
                                                                                    In
                                                                                    <a href="">
                                                                                        Web Design
                                                                                    </a>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            );
                                                        },
                                                    )
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </div>
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
