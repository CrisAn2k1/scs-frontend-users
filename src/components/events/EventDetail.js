import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { events$ } from "../../redux/selectors";
import { getEventDetail } from "../../redux/actions/events";
import ListDonation from "./ListDonation";
import ListPosts from "../posts/ListPosts";
import Loading from "../layouts/Loading";
// import Pagination from "@mui/material/Pagination";

const EventDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const events = useSelector(events$);

    useEffect(() => {
        dispatch(getEventDetail.getEventDetailRequest(id));
    }, [id]);

    if (events.singleEventDetail?.createdAt)
        events.singleEventDetail.createdAt = new Intl.DateTimeFormat("en-US", {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
            .format(new Date(events.singleEventDetail?.createdAt))
            .replace(",", "");

    const lstString = events?.singleEventDetail?.description?.split("\\n");
    console.log(lstString);
    console.log(events);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        events?.singleEventDetail ? setIsLoading(false) : setIsLoading(true);
    }, [events]);

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
                                        events.singleEventDetail?.thumbnail?.url ??
                                        "/img/charity.png"
                                    }
                                    // style={{width:10}}
                                />
                                <h2
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "left",
                                    }}
                                >
                                    {events.singleEventDetail?.title}
                                </h2>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        paddingRight: 20,
                                    }}
                                >
                                    <h6 style={{ marginLeft: 15, marginTop: 15 }}>
                                        {" Ngày: "} {events.singleEventDetail?.createdAt}
                                    </h6>
                                    <button
                                        type="button"
                                        className="btn btn-custom-mirror"
                                        style={{ position: "unset", display: "block" }}
                                    >
                                        Quyên Góp
                                    </button>
                                </div>

                                <hr></hr>
                                <div className="description-event" style={{ padding: "0 15px" }}>
                                    {lstString?.length &&
                                        lstString.map((item) => {
                                            return (
                                                <>
                                                    <p
                                                        style={{
                                                            marginBottom: 7,
                                                            textAlign: "justify",
                                                        }}
                                                    >
                                                        &emsp;&emsp; {item}
                                                    </p>
                                                </>
                                            );
                                        })}
                                </div>
                            </div>
                            <div className="event">
                                <div className="container">
                                    <div className="row"></div>
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
                        <div className="col-lg-4">
                            <div className="sidebar">
                                <div className="sidebar-widget">
                                    <ListDonation />
                                </div>
                                <hr style={{ marginTop: 45 }} />
                                <div className="sidebar-widget">
                                    <ListPosts
                                        posts={events.singleEventDetail?.posts}
                                        title={"Các Bài Viết"}
                                    />
                                </div>
                                <hr />
                            </div>
                            <div className="sidebar">
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
                                                                    <div
                                                                        className="post-item"
                                                                        key={proof.uid}
                                                                    >
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
